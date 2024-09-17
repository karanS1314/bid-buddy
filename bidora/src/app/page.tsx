import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items as itemsSchema } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}

      {session?.user?.name}
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(itemsSchema).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>
      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}

// import { Button } from "@/components/ui/button";
// import { database } from "@/db/database";
// import { bids as bidsSchema } from "@/db/schema";
// import { Input } from "@/components/ui/input";
// import { revalidatePath } from "next/cache";

// export default async function Home() {
//   const bids = await database.query.bids.findMany();

//   return (
//     <main className="container mx-auto py-12">
//       <form
//         action={async (formData: FormData) => {
//           "use server";
//           // const bid = formData.get("bid") as string;
//           await database.insert(bidsSchema).values({});
//           revalidatePath("/");
//         }}
//       >
//         <Input name="bid" type="number" placeholder="Bid" />
//         <Button type="submit"> Place Bid</Button>
//       </form>
//       {bids.map((bid) => (
//         <div key={bid.id}>{bid.id}</div>
//       ))}
//     </main>
//   );
// }
