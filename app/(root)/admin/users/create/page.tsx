import BackButton from "@/components/back-button";
import { SignUpForm } from "@/components/signup-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterUserPage = async () => {
  return (
    <section>
      <BackButton to="/admin/users" />
      <Card className="max-w-lg mx-auto mt-8">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm fromAdminPage={true} />
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterUserPage;
