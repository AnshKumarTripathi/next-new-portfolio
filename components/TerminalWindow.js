"use client";

export default function TerminalWindow({ children, title, version }) {
  return (
    <div className="terminal-window" style={{ width: "100%" }}>
      {/* macOS Window Controls */}
      <div className="window-controls">
        <div className="window-control window-control-close" />
        <div className="window-control window-control-minimize" />
        <div className="window-control window-control-maximize" />
        {title && (
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
              marginLeft: "1rem",
            }}
          >
            {title}
          </div>
        )}
        {version && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
              marginLeft: "auto",
            }}
          >
            {version}
          </div>
        )}
      </div>
      {/* Terminal Content */}
      <div
        style={{
          padding: "1.5rem",
          minHeight: "200px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

