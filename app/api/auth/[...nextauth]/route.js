import ApiKit from "@/common/helpers/APIKit";
import {
  getToken,
  setAccessToken,
  setRefreshToken,
} from "@/common/helpers/HttpKit";
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/common/helpers/keyChain";
import { get } from "lodash";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        console.log(credentials);
        const id = get(credentials, "id", "");
        const password = get(credentials, "password", "");
        const credentialsData = { id, password };
        console.log(credentialsData);
        const getMeData = async () => {
          try {
            const infoResponse = await ApiKit.me.info();
            const me = get(infoResponse, "data", null);
            const personGroup = get(me, "person_group", undefined);
            console.log({ personGroup });
            const isContractor = personGroup === 13;
            const contractor = { name: "Contractor" };

            const employeePermissionGroupResponse =
              await ApiKit.me.getEmployeePermissionGroup();
            const permissionGroup = get(
              employeePermissionGroupResponse,
              "data.results",
              []
            );
            if (isContractor) permissionGroup.push(contractor);
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
            const authToken = {
              access: res.data.access,
              refresh: res.data.refresh,
            };
            setAccessToken(access);
            setRefreshToken(refresh);
            const meData = await getMeData();
            console.log(meData);
            // console.log({ res, access, refresh });
            const user = { ...authToken, ...meData };
            return user;
          };
          const onError = async (err) => {
            const errorData = get(err, "res.data", {});
            const errorMsg = get(errorData, "detail", "");
            if (err.response.status === 401) {
              try {
                const newToken = await getToken();
                setAccessToken(newToken.access);
                setRefreshToken(newToken.refresh);
                // Retry the login request
                return ApiKit.auth
                  .login(credentialsData)
                  .then(onSuccess)
                  .catch(onError);
              } catch (error) {
                // Handle error while refreshing token
                console.error("Error refreshing token during login:", error);
                // Redirect to login or handle as needed
                return null;
              }
            }
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
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
