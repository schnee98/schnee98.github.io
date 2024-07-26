const ANALYTICS_ID = process.env.NEXT_ANALYTICS_ID;

export function Analytics() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS_ID}');
            `,
        }}
      />
    </>
  );
}
