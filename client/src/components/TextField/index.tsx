import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import styles from './text-field.module.scss';

export interface ITextField {
  fieldProps: ControllerRenderProps<FieldValues, any>;
  placeholder?: string;
  password?: boolean;
  email?: boolean;
}

export default function TextField(props: ITextField) {
  return (
    <input
      className={styles.textField}
      {...props.fieldProps}
      {...(props.placeholder && { placeholder: props.placeholder })}
      type={
        (props.password && 'password') || (props.email && 'email') || 'text'
      }
    />
  );
}
