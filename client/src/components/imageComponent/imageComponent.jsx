import { Image } from '@imagekit/react';        

const ImageComponent = ({path,alt,className,w,h, ...props}) => {
    
    return (
        <Image
            urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
            src={path}
            alt={alt}
            transformation={[
                {   width: w,
                    height: h,
                 }
            ]}
            loading="lazy"
            className={className}
            {...props}
        />
    )
};

export default ImageComponent;
