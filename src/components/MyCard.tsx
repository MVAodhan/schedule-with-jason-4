import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClientButton from "./ClientButton";

const MyCard = async ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: number;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <ClientButton id={id} />
      </CardFooter>
    </Card>
  );
};

export default MyCard;
