import { PropsWithChildren } from "react";

function Card({ title, children }: PropsWithChildren<{ title?: string }>) {
  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: 16, marginBottom: 12 }}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
}

export default Card;