import "./globals.css";
import { ContextProvider } from "../components/client";



export const metadata = {
  title: "Passkey",
  description: "Your all Password at one place",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full  w-full  " lang="en">
      <body className="w-full h-full flex flex-col grow">
      <ContextProvider>
          <>
    
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
