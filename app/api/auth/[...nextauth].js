import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import ApiKit from "@/common/helpers/APIKit";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        console.log(credentials);
        const id = get(credentials, "id", "");
        const password = get(credentials, "password", "");
        const credentialsData = { id, password };

        const getMeData = async () => {
          try {
            const infoResponse = await ApiKit.me.info();
            const me = get(infoResponse, "data", null);
            const personGroup = get(me, "person_group", undefined);
            // const isContractor =
            //   personGroup === ENUMS.personGroup.CONTRACTOR.value;
            // const contractor = { name: CONTRACTOR };

            const employeePermissionGroupResponse =
              await ApiKit.me.getEmployeePermissionGroup();
            const permissionGroup = get(
              employeePermissionGroupResponse,
              "data.results",
              []
            );
            permissionGroup.push(contractor);

            return { me, permissionGroup };
          } catch (error) {
            console.error("Error fetching me data:", error);
            return null;
          }
        };
        try {
          const onSuccess = async (res) => {
            const data = get(res, "data", {});
            const access = get(data, "access", "");
            const refresh = get(data, "refresh", "");
            const authToken = { access, refresh };
            // setAccessToken(access);
            // setRefreshToken(refresh);
            const meData = await getMeData();
            const user = { ...authToken, ...meData };
            return user;
          };
          const onError = (err) => {
            const errorData = get(err, "res.data", {});
            const errorMsg = get(errorData, "detail", "");
            return null;
          };
          return ApiKit.auth
            .login(credentialsData)
            .then(onSuccess)
            .catch(onError);
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  page: {
    signIn: "/login",
  },
  session: {
    maxAge: 100 * 24 * 60 * 60,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token[AUTH_TOKEN_KEY] = user.access;
        token[REFRESH_TOKEN_KEY] = user.refresh;
        token.me = user.me;
        token.permissionGroup = user.permissionGroup;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.me = token.me;
      session.permissionGroup = token.permissionGroup;
      session.accessToken = token.accessToken || null;
      session.refreshToken = token.refreshToken || null;

      return session;
    },
  },
};

export default NextAuth(authOptions);
