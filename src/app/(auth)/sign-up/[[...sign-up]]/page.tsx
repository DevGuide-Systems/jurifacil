import { SignUp } from "@clerk/nextjs";
import BackButton from "@/components/back-button";
import { ArrowLeft } from "lucide-react";


export default function SignUpPage() {
  return (
    <>
      <div className="mx-5 min-[768px]:mx-10">
        <BackButton text="voltar" icon={ArrowLeft} page="/"/>
      </div>
      <div className="flex flex-col justify-center items-center">
        <SignUp />
      </div>
    </>
  );
}
