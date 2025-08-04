import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative max-xs:w-[250px] max-xs:h-[250px] w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten">
      <Image
        src="/photo.jpg"
        priority
        quality={100}
        fill
        sizes="498px, 298px"
        alt="My profile picture"
        className="object-contain rounded-full border-2 border-foreground"
      />
    </div>
  );
};

export default Photo;
