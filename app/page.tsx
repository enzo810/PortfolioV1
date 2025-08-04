import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import { auth } from "@/lib/auth";
import { getComments } from "@/server/server.action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
  const comments = await getComments();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col scroller gap-32 xl:gap-60 p-2">
      <Home />
      <Projects />
      <Timeline />
      <Contact comments={comments?.data?.comments} user={session.user} />
    </main>
  );
};

export default Page;
