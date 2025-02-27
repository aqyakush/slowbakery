import React from "react"
import { PageWrapper } from "../../components/StyledComponets"

import Welcome from "./Welcome";
import HomeCards from "./HomeCards";

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <HomeCards />
      <Welcome />
    </PageWrapper>
  )
}

export default Home
