import React from "react";

import "./ShareModal.css";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    text: string;
    url?: string;
  } | null;
}

interface ShareOption {
  name: string;
  icon: string;
  color: string;
  action: (text: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareData,
}) => {
  console.log("ShareModal render:", { isOpen, shareData });

  if (!isOpen || !shareData) return null;

  const { text } = shareData;

  const shareOptions: ShareOption[] = [
    {
      name: "WhatsApp",
      icon: "📱",
      color: "#25D366",
      action: (text) => {
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
      },
    },
    {
      name: "SMS",
      icon: "💬",
      color: "#007AFF",
      action: (text) => {
        const url = `sms:?body=${encodeURIComponent(text)}`;
        window.location.href = url;
      },
    },
    {
      name: "Email",
      icon: "📧",
      color: "#FF6B35",
      action: (text) => {
        const subject = "Transaction Receipt";
        const url = `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(text)}`;
        window.location.href = url;
      },
    },
    {
      name: "Telegram",
      icon: "✈️",
      color: "#0088CC",
      action: (text) => {
        const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
      },
    },
    {
      name: "Twitter",
      icon: "🐦",
      color: "#1DA1F2",
      action: (text) => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}`;
        window.open(url, "_blank");
      },
    },
    {
      name: "Facebook",
      icon: "📘",
      color: "#1877F2",
      action: (text) => {
        const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
          text
        )}`;
        window.open(url, "_blank");
      },
    },
    {
      name: "Copy",
      icon: "📋",
      color: "#6C757D",
      action: async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          alert("✅ Copied to clipboard!");
          onClose();
        } catch (err) {
          console.error("Failed to copy: ", err);
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("✅ Copied to clipboard!");
          onClose();
        }
      },
    },
    {
      name: "More",
      icon: "⋯",
      color: "#28A745",
      action: async (text) => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: shareData.title,
              text: text,
            });
          } catch (err) {
            console.log("Share cancelled", err);
          }
        } else {
          alert("Native sharing not available on this device");
        }
      },
    },
  ];

  return (
    <div 
      className="share-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <div 
        className="share-modal" 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <header className="share-header">
          <h3 id="share-title">Share Receipt</h3>
          <button 
            className="share-close-btn" 
            onClick={onClose}
            aria-label="Close share dialog"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <section className="share-preview" aria-labelledby="preview-title">
          <h4 id="preview-title" className="sr-only">Receipt Preview</h4>
          <div className="share-preview-content" role="document">
            {text.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </section>

        <nav className="share-options-grid" aria-label="Share options">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              className="share-option-btn"
              style={{ "--option-color": option.color } as React.CSSProperties}
              onClick={() => option.action(text)}
              aria-label={`Share via ${option.name}`}
              type="button"
            >
              <div className="share-option-icon" aria-hidden="true">{option.icon}</div>
              <span className="share-option-name">{option.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
