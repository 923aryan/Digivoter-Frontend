export interface User{
        id: string;
        aud: string;
        role: string;
        email: string;
        email_confirmed_at: string;
        phone: string;
        confirmed_at: string;
        last_sign_in_at: string;
        app_metadata: {
          provider: string;
          providers: string[];
        };
        user_metadata: {
          aadharID: string;
          age: number;
          dateOfBirth: string;
          email: string;
          email_verified: boolean;
          firstName: string;
          isVerified: boolean;
          lastName: string;
          middleName?: string;
          phoneNumber: string;
          phone_verified: boolean;
          picture: string;
          sub: string;
          userType: string;
        };
        identities: any[]; // Adjust this type based on the actual structure of identities
        created_at: string;
        updated_at: string;
        is_anonymous: boolean;
}