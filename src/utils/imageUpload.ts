/**
 * Utility to upload customer images to a public cloud host
 * so the business owner receives a direct clickable photo link on WhatsApp!
 */

export async function uploadImageForWhatsApp(fileOrUrl: File | string): Promise<string | null> {
  // If it's already an online public HTTP/HTTPS URL, return it directly
  if (typeof fileOrUrl === 'string' && fileOrUrl.startsWith('http') && !fileOrUrl.startsWith('blob:')) {
    return fileOrUrl;
  }

  try {
    let fileToUpload: File;

    if (typeof fileOrUrl === 'string') {
      // It's a blob: or data: URL, convert to File
      const res = await fetch(fileOrUrl);
      const blob = await res.blob();
      fileToUpload = new File([blob], 'customer-photo.jpg', { type: blob.type || 'image/jpeg' });
    } else {
      fileToUpload = fileOrUrl;
    }

    // Attempt 1: tmpfiles.org API (Fast, free, CORS enabled, no API key needed)
    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        if (json?.data?.url) {
          // Convert https://tmpfiles.org/12345/image.jpg to direct raw link: https://tmpfiles.org/dl/12345/image.jpg
          const rawUrl = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          return rawUrl;
        }
      }
    } catch (e) {
      console.warn('tmpfiles.org upload failed, trying backup...', e);
    }

    // Attempt 2: file.io API fallback
    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const response = await fetch('https://file.io', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        if (json?.link) {
          return json.link;
        }
      }
    } catch (e) {
      console.warn('file.io upload fallback failed:', e);
    }

    return null;
  } catch (error) {
    console.error('Error preparing image for WhatsApp:', error);
    return null;
  }
}
