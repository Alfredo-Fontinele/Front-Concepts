import { TextInput, TextInputProps } from "@mantine/core"

interface InputComponentProps extends TextInputProps {
  registeredValue: string
  register: any
  error: any
}

export default function InputComponent({
  registeredValue,
  error,
  register,
  ...rest
}: InputComponentProps) {
  return (
    <TextInput
      mt="sm"
      error={error[registeredValue] && error[registeredValue].message}
      {...register(registeredValue)}
      {...rest}
    />
  )
}
