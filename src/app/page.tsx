import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Services } from "@/components/sections/services";
import { Staffing } from "@/components/sections/staffing";
import { Stats } from "@/components/sections/stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Staffing />
      <Approach />
      <Mission />
      <Contact />
    </>
  );
}
