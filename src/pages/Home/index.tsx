import React from "react"
import { PageWrapper } from "../../components/StyledComponets"

import Welcome from "./Welcome";
import HomeCards from "./HomeCards";

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <Welcome />
      <HomeCards />
    </PageWrapper>
  )
}

export default Home
