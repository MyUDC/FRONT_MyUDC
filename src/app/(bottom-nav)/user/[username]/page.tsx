import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  let { username } = params;

  if (!username) notFound();
  const userBasePath = `/user/${username}`;
  redirect(`${userBasePath}/testimonies`);
}

