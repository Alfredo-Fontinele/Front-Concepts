import PlyrmeImg from "@/assets/Plyrme.png"
import { yupResolver } from "@hookform/resolvers/yup"
import { Anchor, Button, Checkbox, Grid, Text, TextInput } from "@mantine/core"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

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
    const newData = { ...data, club_name: data.club_name, checkboxStatus }
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
        padding: 40,
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
          <TextInput
            label="Name"
            placeholder="Digite seu nome"
            error={errors.name && errors.name.message}
            mt="sm"
            {...register("name")}
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            error={errors.email && errors.email.message}
            mt="sm"
            {...register("email")}
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <TextInput
            label="Celular"
            placeholder="(00) 00000-0000"
            mt="sm"
            error={errors.phone && errors.phone.message}
            {...register("phone")}
          />
        </Grid.Col>

        <Grid.Col span={5}>
          <TextInput
            label="Senha"
            placeholder="Digite sua senha"
            error={errors.password && errors.password.message}
            mt="sm"
            {...register("password")}
          />
        </Grid.Col>

        <Grid.Col span={7}>
          <TextInput
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            error={errors.confirm_password && errors.confirm_password.message}
            mt="sm"
            {...register("confirm_password")}
          />
        </Grid.Col>

        <Grid.Col span={10}>
          <TextInput
            label="Nome do seu clube"
            placeholder="Digite o nome do seu clube"
            error={errors.club_name && errors.club_name.message}
            mt="sm"
            {...register("club_name")}
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
