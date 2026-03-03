import { Link } from "react-router-dom";

export default function SplitSection({
  label,
  headline,
  body,
  image,
  imagePosition = "right",
  linkText,
  linkHref,
}) {
  const textBlock = (
    <div className="space-y-6">
      {label && (
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
          {label}
        </p>
      )}
      {headline && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 tracking-tight">
          {headline}
        </h2>
      )}
      <div className="h-px w-16 bg-gray-200" />
      {body && (
        <div
          className="text-gray-600 leading-relaxed max-w-[60ch]"
          style={{ lineHeight: 1.7 }}
        >
          {body}
        </div>
      )}
      {linkText && linkHref && (
        <Link
          to={linkHref}
          className="inline-block text-gray-900 font-medium hover:underline"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );

  const imageBlock =
    image && (
      <div className="flex justify-center">
        <img src={image} alt="" className="w-full max-w-md object-cover" />
      </div>
    );

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {imagePosition === "left" ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
