"use client"

import BackgroundImg from "@/assets/background.jpg"
import FormComponent from "@/components/Form"

import { CSSObject, Flex, MediaQuery } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import Image from "next/image"

export default function Home() {
  const matches = useMediaQuery("(min-width: 94rem)")

  const highlight: CSSObject = {
    display: "none",
  }

  return (
    <main>
      <Flex mih={"100vh"} justify="space-between" align="center">
        {matches ? (
          <Flex w={"40%"}>
            <FormComponent />
          </Flex>
        ) : (
          <Flex w={"100%"} justify={"center"}>
            <FormComponent />
          </Flex>
        )}
        <MediaQuery smallerThan={"xl"} styles={highlight}>
          <Flex w={"60%"}>
            <Image
              style={{
                minHeight: "100vh",
                width: "100%",
              }}
              src={BackgroundImg}
              alt={"background image"}
            />
          </Flex>
        </MediaQuery>
      </Flex>
    </main>
  )
}
