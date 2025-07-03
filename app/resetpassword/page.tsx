import ResetPasswordForm from "./ResetPasswordForm";
import { redirect } from "next/navigation";

type ResetPasswordPageProps = {
  searchParams : Promise<{code: string}>
}

export default async function ResetPasswordPage( {searchParams} : ResetPasswordPageProps) {
  const code = (await searchParams).code;

  if(!code) redirect('/login')

  return( <ResetPasswordForm /> ) ;
}
