import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MyCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suspence Title</CardTitle>
        <CardDescription>Suspence Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Suspence Content</p>
      </CardContent>
      <CardFooter>
        <p>Suspence Footer</p>
      </CardFooter>
    </Card>
  );
};

export default MyCard;
