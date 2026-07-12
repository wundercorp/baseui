import { BaseUIProvider, Button, Card, CardContent, CardHeader, Heading, Stack, Text } from "@baseui.sh/react";
import "@baseui.sh/react/styles.css";

export function App() {
  return (
    <BaseUIProvider theme="system">
      <main style={{ minHeight: "100vh", padding: 32 }}>
        <Card style={{ maxWidth: 520, margin: "0 auto" }}>
          <CardHeader>
            <Heading level={1} size="h3">baseui.sh consumer example</Heading>
          </CardHeader>
          <CardContent>
            <Stack>
              <Text>This application imports the published package exactly as another project would.</Text>
              <Button>Continue</Button>
            </Stack>
          </CardContent>
        </Card>
      </main>
    </BaseUIProvider>
  );
}
