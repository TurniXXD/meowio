import styles from './button.module.scss';
import { ReactNode, useRef } from 'react';

export enum ButtonType {
  primary = 'primary',
  upload = 'upload',
}

const Button = ({
  type,
  onClick,
  children,
  textOnly,
}: {
  type: ButtonType;
  onClick?: () => void;
  children: ReactNode;
  textOnly?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    // Trigger the file input to open the file picker dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Prepare the image file to be uploaded (You can send this file to the server using fetch or other methods)
      console.log('Selected file:', file);

      // Simulate image upload to the backend (for demo purposes)
      // Replace this with actual backend API call to upload the image to the '/images' route
      setTimeout(() => {
        console.log('Image successfully uploaded to /images route.');
      }, 1000);
    }
  };

  return (
    <div>
      {type === ButtonType.upload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}
      <button
        className={`${styles.button} ${!textOnly && styles[type]}`}
        onClick={type === ButtonType.upload ? handleFileUpload : onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
