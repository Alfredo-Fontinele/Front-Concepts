import PlyrmeImg from "@/assets/Plyrme.png"
import { yupResolver } from "@hookform/resolvers/yup"
import { Anchor, Button, Checkbox, Grid, Text } from "@mantine/core"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import InputComponent from "./Input"

interface DataProps {
  name: string
  email: string
  phone: string
  password: string
  confirm_password: string
  club_name: string
}

export default function FormComponent() {
  const [checkboxStatus, setCheckBoxStatus] = useState(false)

  const FormSchema = yup.object({
    name: yup.string().required("Nome Obrigatório"),
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Email obrigatório"),
    phone: yup.string().required("Celular obrigatório"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Senha com no mínimo 8 caracteres. Necessário ter letras, números e ao menos um símbolo"
      ),
    confirm_password: yup
      .string()
      .required("Confirme sua Senha")
      .oneOf([yup.ref("password")], "Senhas precisam ser iguais"),
    club_name: yup.string().required("Nome do Clube Obrigatório"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  })

  const onSubmitForm = (data: DataProps) => {
    const newData = {
      ...data,
      club_name: `${data.club_name}.plyr.me`,
      checkboxStatus,
    }
    console.log(newData)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 20,
        padding: 30,
        minHeight: "100vh",
        maxWidth: "700px",
      }}
    >
      <Image src={PlyrmeImg} alt={"logo image"} />
      <Text
        sx={{ fontFamily: "Roboto, sans-serif" }}
        color="#666"
        ta="center"
        fz="xl"
        fw={700}
      >
        Crie seu clube na plyr.me
      </Text>
      <Grid>
        <Grid.Col span={12}>
          <InputComponent
            label="Name"
            placeholder="Digite seu nome"
            error={errors}
            register={register}
            registeredValue="name"
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <InputComponent
            label={"Email"}
            placeholder="Digite seu email"
            error={errors}
            register={register}
            registeredValue="email"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <InputComponent
            label="Celular"
            placeholder="(00) 00000-0000"
            error={errors}
            register={register}
            registeredValue="phone"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <InputComponent
            label="Senha"
            placeholder="Digite sua senha"
            error={errors}
            register={register}
            registeredValue="password"
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <InputComponent
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            error={errors}
            register={register}
            registeredValue="confirm_password"
          />
        </Grid.Col>
        <Grid.Col span={10}>
          <InputComponent
            label="Nome do seu clube"
            placeholder="Digite o nome do seu clube"
            error={errors}
            register={register}
            registeredValue="club_name"
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Text mt={50}>.plyr.me</Text>
        </Grid.Col>
      </Grid>
      <Checkbox
        onClick={(e) => setCheckBoxStatus((value) => !value)}
        required
        label={
          <Text>
            Aceito os {}
            <Anchor href="https://mantine.dev" target="_blank" color="orange">
              Termos e Condições
            </Anchor>
            {} da Plyr.me e confirmo que não publicarei conteúdo adulto no meu
            clube.
          </Text>
        }
      />
      <Button type="submit" color="orange">
        CRIAR CONTA
      </Button>
      <Text>
        Já tem um clube? {}
        <Anchor href="https://mantine.dev" target="_blank" color="orange">
          Faça o Login
        </Anchor>
      </Text>
    </form>
  )
}
