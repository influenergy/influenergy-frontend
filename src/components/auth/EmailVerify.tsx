import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const EmailVerify = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium">Verify your email</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          We have sent a verification link to your email address. Please check
          your email and click on the link to verify your email.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmailVerify;
