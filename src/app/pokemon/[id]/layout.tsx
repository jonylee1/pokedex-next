import '@styles/globals.css';

export default function Layout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <head>
          <title>Next.js</title>
        </head>
        <body>
          <div>bulbasaurs</div>
          <div>{children}</div>
        </body>
      </html>
    );
  }