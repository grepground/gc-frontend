import React from "react";

// Sosyal Medya SVG İkon Bileşenleri
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function ThreadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.186 24C5.437 24 0 18.573 0 11.838 0 5.103 5.437 0 12.186 0c6.75 0 12.186 5.103 12.186 11.838 0 6.735-5.437 12.162-12.186 12.162zm0-22.102C6.467 1.898 1.898 6.353 1.898 11.838c0 5.485 4.569 9.94 10.288 9.94 5.719 0 10.288-4.455 10.288-9.94 0-5.485-4.569-9.94-10.288-9.94zm.082 15.112c-3.13 0-5.443-2.128-5.443-5.011 0-2.883 2.313-5.011 5.443-5.011 3.13 0 5.443 2.128 5.443 5.011 0 2.883-2.313 5.011-5.443 5.011zm0-8.232c-1.996 0-3.486 1.373-3.486 3.221 0 1.848 1.49 3.221 3.486 3.221 1.996 0 3.486-1.373 3.486-3.221 0-1.848-1.49-3.221-3.486-3.221z" />
    </svg>
  );
}

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.67 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.54-1.28 2.53.02 1.01.58 1.93 1.44 2.44.89.54 2.03.58 2.97.12.92-.44 1.53-1.37 1.58-2.39.04-3.8.02-7.61.03-11.41z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const socialLinks = [
  { name: "YouTube", url: "https://youtube.com/@grepcheck", icon: YoutubeIcon },
  {
    name: "Instagram",
    url: "https://instagram.com/grepcheck",
    icon: InstagramIcon,
  },
  { name: "Threads", url: "https://threads.net/@grepcheck", icon: ThreadsIcon },
  { name: "TikTok", url: "https://tiktok.com/@grepcheck", icon: TiktokIcon },
  { name: "X (Twitter)", url: "https://x.com/grepcheck", icon: XIcon },
  {
    name: "Pinterest",
    url: "https://pinterest.com/grepcheck",
    icon: PinterestIcon,
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10 px-4">
      {/* Header Section */}
      <section className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-chess-text tracking-tight lowercase">
          contact us
        </h1>
        <p className="text-sm sm:text-base font-bold text-chess-text/60 leading-relaxed max-w-2xl">
          Have questions or feedback? We&apos;d love to hear from you. Reach out
          via email or follow us on social media.
        </p>
      </section>

      {/* Main Grid */}
      <section className="grid md:grid-cols-2 gap-4">
        {/* Email Card */}
        <div className="bg-chess-surface p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-chess-primary/10 text-chess-primary flex items-center justify-center font-black">
              <MailIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-chess-text">Email</h2>
              <p className="text-xs font-bold text-chess-text/50 mt-1">
                Drop us a line anytime at:
              </p>
            </div>
          </div>
          <a
            href="mailto:contact@grepground.org"
            className="text-base sm:text-lg font-mono font-black text-chess-primary hover:opacity-80 transition-opacity break-all block"
          >
            contact@grepground.org
          </a>
        </div>

        {/* Socials Card */}
        <div className="bg-chess-surface p-6 sm:p-8 rounded-3xl space-y-5">
          <h2 className="text-xl font-black text-chess-text">Social Media</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-chess-bg text-chess-text hover:bg-chess-surface-hover transition-colors group"
                >
                  <IconComponent className="w-5 h-5 text-chess-primary shrink-0 transition-transform group-hover:scale-105" />
                  <span className="text-xs font-black text-chess-text/80 group-hover:text-chess-text transition-colors truncate">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Support Section */}
      <section className="bg-chess-surface p-6 sm:p-8 rounded-3xl text-center space-y-2">
        <h2 className="text-lg font-black text-chess-text">
          Community Support
        </h2>
        <p className="text-xs font-bold text-chess-text/60 max-w-xl mx-auto leading-relaxed">
          For bug reports or feature requests, you can also reach out to our
          team directly. We usually respond within 24-48 hours.
        </p>
      </section>
    </div>
  );
}
