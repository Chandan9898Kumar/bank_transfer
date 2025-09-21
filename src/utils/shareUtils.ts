// Platform detection and sharing utilities
export const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  return {
    isIOS: /iphone|ipad|ipod/.test(userAgent),
    isAndroid: /android/.test(userAgent),
    isMobile: /mobile|android|iphone|ipad|ipod/.test(userAgent),
    isSafari: /safari/.test(userAgent) && !/chrome/.test(userAgent),
    isChrome: /chrome/.test(userAgent),
    isFirefox: /firefox/.test(userAgent),
    isEdge: /edge/.test(userAgent)
  };
};

export const canUseNativeShare = () => {
  return 'share' in navigator && 'canShare' in navigator;
};

export const formatTransactionForShare = (data: {
  from: string;
  to: string;
  amount: string;
  date?: string;
  transactionId?: string;
}) => {
  const date = data.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const txnId = data.transactionId || `TXN${Date.now().toString().slice(-8)}`;
  
  return `💰 Transfer Successful!

📤 From: ${data.from}
📥 To: ${data.to}
💵 Amount: $${data.amount}
📅 Date: ${date}
🔢 Transaction ID: ${txnId}

✅ Transaction completed successfully

Sent via MyBank App 🏦`;
};

// Deep link handlers for different platforms
export const shareViaWhatsApp = (text: string) => {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

export const shareViaSMS = (text: string) => {
  const device = detectDevice();
  
  if (device.isIOS) {
    window.location.href = `sms:&body=${encodeURIComponent(text)}`;
  } else {
    window.location.href = `sms:?body=${encodeURIComponent(text)}`;
  }
};

export const shareViaEmail = (text: string, subject = 'Transaction Receipt') => {
  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  window.location.href = url;
};

export const shareViaTelegram = (text: string) => {
  const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

export const shareViaTwitter = (text: string) => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

export const shareViaFacebook = (text: string) => {
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return success;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};