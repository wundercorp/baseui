import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Alert,
  AppShell,
  Avatar,
  AvatarGroup,
  Badge,
  BaseUIProvider,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Callout,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Checkbox,
  Code,
  CodeBlock,
  Collapsible,
  ColorSwatch,
  CommandMenu,
  Container,
  CopyButton,
  DataToolbar,
  DateInput,
  DescriptionItem,
  DescriptionList,
  Dialog,
  Divider,
  Drawer,
  DropdownItem,
  DropdownMenu,
  EmptyState,
  Eyebrow,
  Field,
  FileUpload,
  FormActions,
  FormSection,
  Grid,
  Heading,
  Icon,
  IconButton,
  iconNames,
  Inline,
  Input,
  Kbd,
  Label,
  Link,
  List,
  ListItem,
  LogoMark,
  Meter,
  MetricCard,
  NotificationBadge,
  PageHeader,
  Pagination,
  Popover,
  Progress,
  Radio,
  Rating,
  SearchInput,
  SegmentedControl,
  Select,
  Sidebar,
  Skeleton,
  Slider,
  Spacer,
  Spinner,
  Stack,
  Stat,
  StatusBadge,
  Stepper,
  Switch,
  Table,
  TableContainer,
  Tabs,
  Tag,
  Text,
  Textarea,
  TimeInput,
  Timeline,
  Toast,
  ToastRegion,
  TokenPreview,
  Tooltip,
  Topbar,
  VisuallyHidden,
  type BaseUITheme,
} from "@baseui.sh/react";

type ShowcaseSection =
  | "overview"
  | "foundations"
  | "actions"
  | "forms"
  | "data"
  | "feedback"
  | "navigation"
  | "overlays"
  | "patterns";

const sections: Array<{ id: ShowcaseSection; label: string; icon: string }> = [
  { id: "overview", label: "Overview", icon: "◫" },
  { id: "foundations", label: "Foundations", icon: "◧" },
  { id: "actions", label: "Actions", icon: "↗" },
  { id: "forms", label: "Forms", icon: "⌁" },
  { id: "data", label: "Data display", icon: "▤" },
  { id: "feedback", label: "Feedback", icon: "!" },
  { id: "navigation", label: "Navigation", icon: "≡" },
  { id: "overlays", label: "Overlays", icon: "□" },
  { id: "patterns", label: "Patterns", icon: "◆" },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="baseui-section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={2} size="h2">
        {title}
      </Heading>
      <Text size="lg">{description}</Text>
    </div>
  );
}

function ComponentExample({
  title,
  description,
  children,
  code,
  fullWidth = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  fullWidth?: boolean;
}) {
  return (
    <Card className={fullWidth ? "baseui-example is-full-width" : "baseui-example"} padding="none">
      <CardHeader className="baseui-example-header">
        <div>
          <Heading level={3} size="h5">
            {title}
          </Heading>
          {description ? <Text size="sm">{description}</Text> : null}
        </div>
        {code ? <CopyButton value={code} /> : null}
      </CardHeader>
      <CardContent className="baseui-example-stage">{children}</CardContent>
      {code ? (
        <CardFooter className="baseui-example-code">
          <CodeBlock>{code}</CodeBlock>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function OverviewSection() {
  return (
    <Stack gap="xl">
      <PageHeader
        eyebrow="baseui.sh"
        title="A restrained interface system for serious software."
        description="A complete React component library built around precise hierarchy, compact geometry, neutral surfaces, and a strict 4 px radius."
        actions={
          <Inline>
            <Button onClick={() => document.getElementById("component-map")?.scrollIntoView({ behavior: "smooth" })}>
              Browse components
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById("installation")?.scrollIntoView({ behavior: "smooth" })}>
              Installation
            </Button>
          </Inline>
        }
      />

      <Grid columns={4} gap="md">
        <MetricCard label="Components" value="88" change="Production-ready" trend="up" detail="React primitives" />
        <MetricCard label="Radius" value="4px" change="Invariant" trend="neutral" detail="Every surface" />
        <MetricCard label="Themes" value="2" change="Light + dark" trend="up" detail="Semantic tokens" />
        <MetricCard label="Dependencies" value="0" change="Runtime UI deps" trend="up" detail="React only" />
      </Grid>

      <Grid columns={2} gap="lg">
        <Card padding="large">
          <Stack gap="lg">
            <div>
              <Eyebrow>Principle 01</Eyebrow>
              <Heading level={2} size="h3">Clarity before decoration</Heading>
            </div>
            <Text size="lg">
              Typography, spacing, contrast, and alignment carry the interface. Color and motion are used only when they communicate state or hierarchy.
            </Text>
            <Divider />
            <Inline gap="lg" align="start">
              <Stat label="Base grid" value="4 px" description="All spacing derives from it" />
              <Stat label="Control heights" value="32 / 40 / 48" description="Three deliberate sizes" />
            </Inline>
          </Stack>
        </Card>
        <Card padding="large" variant="subtle">
          <Stack gap="lg">
            <div>
              <Eyebrow>Principle 02</Eyebrow>
              <Heading level={2} size="h3">Product language, not page styling</Heading>
            </div>
            <Text size="lg">
              Components share one semantic token layer, predictable state model, keyboard focus treatment, and responsive behavior.
            </Text>
            <Alert tone="success" title="System-level consistency">
              This documentation application consumes the exact workspace package shown in this catalogue.
            </Alert>
          </Stack>
        </Card>
      </Grid>

      <Card id="component-map" padding="large">
        <CardHeader>
          <div>
            <Eyebrow>Coverage</Eyebrow>
            <Heading level={2} size="h3">Component map</Heading>
          </div>
          <Badge tone="accent">88 components</Badge>
        </CardHeader>
        <CardContent>
          <Grid columns={3} gap="lg">
            {[
              ["Foundations", "Provider, layout, grid, typography, color, spacing, tokens"],
              ["Actions", "Buttons, icon buttons, groups, links, tags, copy actions"],
              ["Forms", "Fields, inputs, select, textarea, checkbox, radio, switch, slider, upload"],
              ["Data display", "Cards, metrics, tables, lists, descriptions, avatars, badges, progress"],
              ["Feedback", "Alerts, toasts, skeletons, spinners, empty states, status indicators"],
              ["Navigation", "Sidebar, topbar, tabs, breadcrumbs, pagination, segmented controls"],
              ["Overlays", "Dialog, drawer, popover, dropdown menu, tooltip"],
              ["Disclosure", "Accordion, collapsible, stepper, timeline"],
              ["Patterns", "App shell, page header, command menu, data toolbar, form composition"],
            ].map(([title, description]) => (
              <Box key={title} padding="medium" surface="subtle">
                <Stack gap="sm">
                  <Heading level={3} size="h5">{title}</Heading>
                  <Text size="sm">{description}</Text>
                </Stack>
              </Box>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}

function FoundationsSection() {
  return (
    <Stack gap="xl">
      <SectionHeader
        eyebrow="Foundations"
        title="One visual grammar, expressed as tokens."
        description="The component layer is intentionally thin. Color, type, spacing, motion, elevation, and geometry are defined once and consumed semantically."
      />

      <ComponentExample title="Color system" description="Neutral surfaces with one product accent and semantic state colors." fullWidth>
        <Grid columns={4} gap="lg">
          <ColorSwatch color="#f4f4f1" label="Canvas" />
          <ColorSwatch color="#ffffff" label="Surface" />
          <ColorSwatch color="#171716" label="Text" />
          <ColorSwatch color="#d42d24" label="Accent" />
          <ColorSwatch color="#247a4d" label="Success" />
          <ColorSwatch color="#996115" label="Warning" />
          <ColorSwatch color="#bd2c26" label="Danger" />
          <ColorSwatch color="#365f8d" label="Information" />
        </Grid>
      </ComponentExample>

      <ComponentExample title="Icon system" description="A first-party 24 px stroke set for navigation, status, action, and technical concepts." fullWidth>
        <Grid columns={6} gap="md">
          {iconNames.map((name) => (
            <Box key={name} padding="medium" surface="subtle">
              <Stack gap="sm" align="center">
                <Icon name={name} size={24} />
                <Code>{name}</Code>
              </Stack>
            </Box>
          ))}
        </Grid>
      </ComponentExample>

      <ComponentExample title="Typography" description="A compact grotesk hierarchy with monospace reserved for technical content." fullWidth>
        <Stack gap="lg">
          <Heading level={1} size="display">Display heading</Heading>
          <Heading level={1} size="h1">Page heading</Heading>
          <Heading level={2} size="h2">Section heading</Heading>
          <Heading level={3} size="h3">Subsection heading</Heading>
          <Heading level={4} size="h4">Card heading</Heading>
          <Text size="lg">Large body copy for introductions and important explanatory content.</Text>
          <Text>Default body copy for product interfaces, forms, and documentation.</Text>
          <Text size="sm">Secondary detail and compact supporting information.</Text>
          <Inline><Eyebrow>Eyebrow label</Eyebrow><Label>Form label</Label><Code>npm install @baseui.sh/react</Code><Kbd>⌘ K</Kbd></Inline>
        </Stack>
      </ComponentExample>

      <Grid columns={2} gap="lg">
        <ComponentExample title="Spacing tokens" description="A 4 px base grid with deliberate jumps at larger scales.">
          <Stack gap="md">
            {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
              <div className="baseui-spacing-row" key={size}>
                <Code>{size}px</Code>
                <span style={{ width: size * 2 }} />
              </div>
            ))}
          </Stack>
        </ComponentExample>
        <ComponentExample title="Radius and elevation" description="4 px everywhere. Elevation is reserved for floating layers.">
          <Grid columns={2} gap="md">
            <TokenPreview name="--bui-radius" value="4px" sample={<div className="baseui-radius-sample" />} />
            <TokenPreview name="--bui-shadow-low" value="surface" sample={<Card className="baseui-shadow-low" />} />
            <TokenPreview name="--bui-shadow-medium" value="popover" sample={<Card className="baseui-shadow-medium" />} />
            <TokenPreview name="--bui-shadow-high" value="modal" sample={<Card className="baseui-shadow-high" />} />
          </Grid>
        </ComponentExample>
      </Grid>

      <ComponentExample title="Layout primitives" description="Stack, inline, grid, box, and container form the composition layer." fullWidth>
        <Grid columns={3} gap="md">
          <Box padding="medium" surface="subtle"><Stack gap="sm"><Badge>Stack</Badge><Box padding="small" surface="default">Item 1</Box><Spacer size="sm" /><Box padding="small" surface="default">Item 2</Box></Stack></Box>
          <Box padding="medium" surface="subtle"><Inline gap="sm"><Badge>Inline</Badge><Tag>Alpha</Tag><Tag>Beta</Tag></Inline></Box>
          <Box padding="medium" surface="subtle"><Grid columns={2} gap="sm"><Badge>Grid</Badge><Box padding="small" surface="default">Cell</Box><Box padding="small" surface="default">Cell</Box><Box padding="small" surface="default">Cell</Box></Grid></Box>
        </Grid>
      </ComponentExample>

      <ComponentExample title="Accessibility primitives" description="Visible labeling and screen-reader-only content remain composable." fullWidth>
        <Inline gap="lg">
          <Button variant="secondary" leadingIcon={<Icon name="download" />}>
            <VisuallyHidden>Download token file</VisuallyHidden>
            Download
          </Button>
          <Text size="sm">Focus-visible, reduced-motion, semantic status, and accessible naming are package-level defaults.</Text>
        </Inline>
      </ComponentExample>
    </Stack>
  );
}

function ActionsSection() {
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Actions" title="Clear priority without visual noise." description="Action components distinguish intent through fill, border, and semantic tone rather than oversized geometry or decorative effects." />
      <Grid columns={2} gap="lg">
        <ComponentExample title="Button variants" code={'<Button variant="primary">Create model</Button>'}>
          <Inline gap="sm">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Delete</Button>
            <Button variant="link">Text action</Button>
          </Inline>
        </ComponentExample>
        <ComponentExample title="Sizes and states">
          <Inline gap="sm" align="center">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </Inline>
        </ComponentExample>
        <ComponentExample title="Icon buttons and tooltips">
          <Inline gap="sm">
            <Tooltip content="Refresh data"><IconButton label="Refresh">↻</IconButton></Tooltip>
            <Tooltip content="Open settings"><IconButton label="Settings" variant="secondary">⚙</IconButton></Tooltip>
            <Tooltip content="Delete item"><IconButton label="Delete" variant="danger">×</IconButton></Tooltip>
          </Inline>
        </ComponentExample>
        <ComponentExample title="Button group">
          <ButtonGroup>
            <Button variant="secondary">Day</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="secondary">Month</Button>
          </ButtonGroup>
        </ComponentExample>
        <ComponentExample title="Links and copy actions">
          <Inline gap="lg">
            <Link href="#">Documentation</Link>
            <CopyButton value="npm install @baseui.sh/react" label="Copy install command" />
          </Inline>
        </ComponentExample>
        <ComponentExample title="Tags and removable filters">
          <Inline>
            <Tag>Production</Tag>
            <Tag onRemove={() => undefined}>Europe West</Tag>
            <Tag onRemove={() => undefined}>Status: Active</Tag>
          </Inline>
        </ComponentExample>
      </Grid>
    </Stack>
  );
}

function FormsSection() {
  const [sliderValue, setSliderValue] = useState(42);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(true);
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Forms" title="Dense enough for tools, calm enough for long sessions." description="Every control has consistent sizing, error treatment, focus indication, disabled behavior, and supporting text." />
      <Grid columns={2} gap="lg">
        <ComponentExample title="Text inputs">
          <Stack gap="md">
            <Field label="Model name" htmlFor="model-name" required description="Used in API requests and dashboard labels."><Input id="model-name" placeholder="qwen-small" /></Field>
            <Field label="Endpoint" htmlFor="endpoint"><Input id="endpoint" startAdornment={<Code>https://</Code>} endAdornment={<Badge>API</Badge>} defaultValue="api.example.com/v1" /></Field>
            <Field label="Invalid input" htmlFor="invalid" error="The value must be a valid URL."><Input id="invalid" invalid defaultValue="not-a-url" /></Field>
            <Field label="Disabled input" htmlFor="disabled"><Input id="disabled" disabled value="Managed by your organization" readOnly /></Field>
          </Stack>
        </ComponentExample>
        <ComponentExample title="Select and textarea">
          <Stack gap="md">
            <Field label="Runtime" htmlFor="runtime"><Select id="runtime" defaultValue="ollama"><option value="ollama">Ollama</option><option value="llamacpp">llama.cpp</option><option value="remote">Remote gateway</option></Select></Field>
            <Field label="System prompt" htmlFor="prompt"><Textarea id="prompt" placeholder="You are a helpful assistant…" /></Field>
          </Stack>
        </ComponentExample>
        <ComponentExample title="Search and date controls">
          <Stack gap="md">
            <SearchInput value={search} onChange={(event) => setSearch(event.target.value)} onClear={() => setSearch("")} placeholder="Search models" />
            <Inline align="start"><Field label="Start date"><DateInput /></Field><Field label="Run time"><TimeInput /></Field></Inline>
          </Stack>
        </ComponentExample>
        <ComponentExample title="Choice controls">
          <Stack gap="md">
            <Checkbox label="Enable telemetry" description="Share anonymous performance data." defaultChecked />
            <Checkbox label="Install optional runtime" description="Adds the optimized local runner." />
            <Radio name="region" label="Switzerland" description="Data remains in Zurich." defaultChecked />
            <Radio name="region" label="European Union" description="Process in Frankfurt." />
            <Switch label="Usage notifications" description="Alert at 80% of allowance." checked={notifications} onChange={(event) => setNotifications(event.target.checked)} />
          </Stack>
        </ComponentExample>
        <ComponentExample title="Slider and upload">
          <Stack gap="lg">
            <Field label="Temperature" description="Lower values are more deterministic."><Slider min={0} max={100} value={sliderValue} valueLabel={(sliderValue / 100).toFixed(2)} onChange={(event) => setSliderValue(Number(event.target.value))} /></Field>
            <FileUpload title="Upload model artifact" description="GGUF, safetensors, or archive up to 8 GB" />
          </Stack>
        </ComponentExample>
        <ComponentExample title="Composed form">
          <FormSection>
            <Field label="Gateway label" required><Input placeholder="Production gateway" /></Field>
            <Field label="Base URL" required><Input placeholder="https://gateway.example.com" /></Field>
            <Field label="Authentication"><Select><option>Bearer token</option><option>API key header</option><option>None</option></Select></Field>
            <FormActions><Button variant="secondary">Cancel</Button><Button>Create gateway</Button></FormActions>
          </FormSection>
        </ComponentExample>
      </Grid>
    </Stack>
  );
}

function DataSection() {
  const [page, setPage] = useState(2);
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Data display" title="Structured information with deliberate density." description="Cards, metrics, lists, tables, and technical content prioritize comparison and scanning without becoming visually heavy." />
      <ComponentExample title="Cards" fullWidth>
        <Grid columns={3} gap="md">
          <Card><CardHeader><Heading level={3} size="h5">Default card</Heading><Badge>Base</Badge></CardHeader><CardContent><Text>Primary surface for grouped content and actions.</Text></CardContent></Card>
          <Card variant="subtle"><CardHeader><Heading level={3} size="h5">Subtle card</Heading></CardHeader><CardContent><Text>Lower-emphasis grouping inside a larger workflow.</Text></CardContent></Card>
          <Card variant="interactive"><CardHeader><Heading level={3} size="h5">Interactive card</Heading><span aria-hidden="true">→</span></CardHeader><CardContent><Text>Hover treatment signals navigation or selection.</Text></CardContent></Card>
        </Grid>
      </ComponentExample>
      <ComponentExample title="Metrics and status" fullWidth>
        <Grid columns={4} gap="md">
          <MetricCard label="Requests" value="24.8k" change="+12.4%" trend="up" detail="vs. prior period" />
          <MetricCard label="Latency" value="128 ms" change="−18 ms" trend="up" detail="p95 response" />
          <MetricCard label="Errors" value="0.14%" change="+0.02%" trend="down" detail="last 24 hours" />
          <MetricCard label="Cost" value="$42.18" change="On budget" trend="neutral" detail="monthly total" />
        </Grid>
      </ComponentExample>
      <Grid columns={2} gap="lg">
        <ComponentExample title="Badges and avatars">
          <Stack gap="lg">
            <Inline><Badge>Neutral</Badge><Badge tone="accent">Accent</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Danger</Badge><Badge tone="info">Info</Badge></Inline>
            <Inline><StatusBadge status="online">Healthy</StatusBadge><StatusBadge status="pending">Installing</StatusBadge><StatusBadge status="error">Failed</StatusBadge><StatusBadge status="offline">Offline</StatusBadge></Inline>
            <AvatarGroup><Avatar initials="AB" status="online" /><Avatar initials="CD" /><Avatar initials="EF" status="busy" /><Avatar initials="+4" /></AvatarGroup>
          </Stack>
        </ComponentExample>
        <ComponentExample title="Progress and loading">
          <Stack gap="lg">
            <Progress label="Model download" value={68} showValue />
            <Progress label="Indexing documents" value={41} tone="info" showValue />
            <Meter label="Memory pressure" value={72} high={80} optimum={40} />
            <Inline><Spinner size="small" /><Spinner /><Spinner size="large" /></Inline>
            <Skeleton lines={3} />
          </Stack>
        </ComponentExample>
      </Grid>
      <ComponentExample title="Data table" fullWidth>
        <Stack gap="md">
          <DataToolbar search={<SearchInput placeholder="Search requests" />} filters={<Select defaultValue="all"><option value="all">All statuses</option><option value="success">Success</option><option value="error">Error</option></Select>} actions={<Button>Export CSV</Button>} />
          <TableContainer>
            <Table>
              <thead><tr><th>Request</th><th>Model</th><th>Status</th><th>Latency</th><th>Tokens</th><th>Time</th></tr></thead>
              <tbody>
                <tr><td><Code>req_98f3a2</Code></td><td>qwen-small</td><td><StatusBadge status="online">Complete</StatusBadge></td><td>112 ms</td><td>842</td><td>10:42:18</td></tr>
                <tr><td><Code>req_98f39c</Code></td><td>llama-3.2</td><td><StatusBadge status="pending">Running</StatusBadge></td><td>—</td><td>1,204</td><td>10:41:56</td></tr>
                <tr><td><Code>req_98f31b</Code></td><td>qwen-small</td><td><StatusBadge status="error">Failed</StatusBadge></td><td>38 ms</td><td>0</td><td>10:40:12</td></tr>
              </tbody>
            </Table>
          </TableContainer>
          <Inline justify="between"><Text size="sm">Showing 11–20 of 48 requests</Text><Pagination page={page} pageCount={5} onPageChange={setPage} /></Inline>
        </Stack>
      </ComponentExample>
      <Grid columns={2} gap="lg">
        <ComponentExample title="Description list">
          <DescriptionList><DescriptionItem term="Model">Qwen2.5 0.5B Instruct</DescriptionItem><DescriptionItem term="Format"><Code>GGUF · Q4_K_M</Code></DescriptionItem><DescriptionItem term="Location">~/.local/share/models</DescriptionItem><DescriptionItem term="License">Apache-2.0</DescriptionItem></DescriptionList>
        </ComponentExample>
        <ComponentExample title="Structured list">
          <List divided><ListItem leading={<Avatar initials="Q" size="small" />} title="Qwen2.5 0.5B" description="Ready · 491 MB" trailing={<Button size="small" variant="ghost">Open</Button>} /><ListItem leading={<Avatar initials="L" size="small" />} title="Llama 3.2 1B" description="Installing · 68%" trailing={<Spinner size="small" />} /><ListItem leading={<Avatar initials="M" size="small" />} title="Mistral 7B" description="Not installed" trailing={<Button size="small" variant="secondary">Install</Button>} /></List>
        </ComponentExample>
      </Grid>
      <ComponentExample title="Code and technical values" fullWidth>
        <Stack gap="md">
          <Inline><Code>http://127.0.0.1:11435</Code><Kbd>⌘</Kbd><Kbd>K</Kbd><CopyButton value="curl http://127.0.0.1:11435/v1/models" /></Inline>
          <CodeBlock title="Request example" language="shell" actions={<CopyButton value={'curl http://127.0.0.1:11435/v1/models'} variant="ghost" />}>
{`curl http://127.0.0.1:11435/v1/models \\
  -H 'authorization: Bearer $API_TOKEN'`}
          </CodeBlock>
        </Stack>
      </ComponentExample>
    </Stack>
  );
}

function FeedbackSection() {
  const [toastVisible, setToastVisible] = useState(false);
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Feedback" title="State is explicit, calm, and actionable." description="Semantic feedback uses color as a secondary signal alongside labels, structure, and clear actions." />
      <Grid columns={2} gap="lg">
        <ComponentExample title="Alerts">
          <Stack gap="md"><Alert tone="info" title="Runtime update available">Version 0.8.2 includes faster GGUF loading.</Alert><Alert tone="success" title="Model installed">Qwen2.5 is ready for local inference.</Alert><Alert tone="warning" title="Memory pressure is high">Close another model before loading this one.</Alert><Alert tone="danger" title="Gateway unavailable" actions={<Button size="small" variant="secondary">Retry connection</Button>}>The remote endpoint did not respond.</Alert></Stack>
        </ComponentExample>
        <ComponentExample title="Callouts and empty states">
          <Stack gap="md">
            <Callout tone="info" title="Local-first by default">Cloud routing is used only when the selected workflow requires it.</Callout>
            <EmptyState compact icon="◇" title="No gateways yet" description="Connect a gateway to route requests beyond your local runtime." actions={<Button>Add gateway</Button>} />
          </Stack>
        </ComponentExample>
        <ComponentExample title="Loading states">
          <Stack gap="lg"><Inline><Spinner /><Text>Synchronizing cloud usage…</Text></Inline><Skeleton height={36} /><Skeleton lines={4} /><Progress label="Preparing runtime" value={24} showValue /></Stack>
        </ComponentExample>
        <ComponentExample title="Toast notification">
          <Stack gap="md"><Button onClick={() => setToastVisible(true)}>Show toast</Button><Toast tone="success" title="Changes saved" description="Your gateway configuration is now active." action={<Button variant="link" size="small">View details</Button>} /></Stack>
          {toastVisible ? <ToastRegion><Toast tone="success" title="Model installed" description="Qwen2.5 is ready to use." onDismiss={() => setToastVisible(false)} /></ToastRegion> : null}
        </ComponentExample>
      </Grid>
      <ComponentExample title="Timeline and step status" fullWidth>
        <Grid columns={2} gap="xl">
          <Timeline items={[{ title: "Install requested", description: "Artifact resolution started.", timestamp: "10:38", tone: "neutral" }, { title: "Download complete", description: "491 MB verified successfully.", timestamp: "10:41", tone: "success" }, { title: "Runtime registration", description: "Adding model alias and metadata.", timestamp: "Now", tone: "accent" }]} />
          <Stepper orientation="vertical" items={[{ title: "Choose model", description: "Qwen2.5 0.5B", status: "complete" }, { title: "Review requirements", description: "491 MB disk · 1 GB memory", status: "complete" }, { title: "Install runtime", description: "Downloading optimized binary", status: "current" }, { title: "Test model", description: "Run the first completion", status: "upcoming" }]} />
        </Grid>
      </ComponentExample>
    </Stack>
  );
}

function NavigationSection() {
  const [tab, setTab] = useState("overview");
  const [segment, setSegment] = useState("week");
  const [page, setPage] = useState(3);
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Navigation" title="Orientation remains obvious at every scale." description="Navigation components use direct labels, restrained active states, and predictable placement." />
      <Grid columns={2} gap="lg">
        <ComponentExample title="Tabs">
          <Stack gap="lg"><Tabs value={tab} onValueChange={setTab} items={[{ value: "overview", label: "Overview" }, { value: "performance", label: "Performance", count: 8 }, { value: "logs", label: "Logs" }, { value: "settings", label: "Settings" }]} /><Box padding="medium" surface="subtle">Active tab: <Code>{tab}</Code></Box></Stack>
        </ComponentExample>
        <ComponentExample title="Segmented control">
          <Stack gap="lg"><SegmentedControl value={segment} onValueChange={setSegment} items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} /><Text size="sm">Selected range: {segment}</Text></Stack>
        </ComponentExample>
        <ComponentExample title="Breadcrumbs">
          <Breadcrumbs items={[{ label: "Components", href: "#components" }, { label: "Data display", href: "#data" }, { label: "MetricCard" }]} />
        </ComponentExample>
        <ComponentExample title="Pagination">
          <Pagination page={page} pageCount={9} onPageChange={setPage} />
        </ComponentExample>
      </Grid>
      <ComponentExample title="Sidebar and topbar composition" fullWidth>
        <div className="baseui-shell-preview">
          <Sidebar brand={<Inline><LogoMark label="B" /><strong>baseui.sh</strong></Inline>} activeItem="components" items={[{ id: "overview", label: "Overview", icon: "◫" }, { id: "components", label: "Components", icon: "◆", badge: <NotificationBadge count={88} /> }, { id: "tokens", label: "Tokens", icon: "◧" }, { id: "patterns", label: "Patterns", icon: "▤" }]} footer={<StatusBadge status="online">System healthy</StatusBadge>} />
          <div className="baseui-shell-preview-workspace"><Topbar title="Components" actions={<Inline><IconButton label="Search">⌕</IconButton><Avatar initials="BU" size="small" /></Inline>} /><div className="baseui-shell-preview-content"><PageHeader eyebrow="Library" title="Components" description="Reusable building blocks for product interfaces." /></div></div>
        </div>
      </ComponentExample>
    </Stack>
  );
}

function OverlaysSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Overlays" title="Floating layers stay focused and predictable." description="Overlays share one elevation model, precise geometry, explicit dismissal, and keyboard escape behavior." />
      <Grid columns={2} gap="lg">
        <ComponentExample title="Dialog">
          <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Install Qwen2.5" description="Review local resource requirements before continuing." footer={<><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Install model</Button></>}>
            <DescriptionList><DescriptionItem term="Download">491 MB</DescriptionItem><DescriptionItem term="Memory">1 GB minimum</DescriptionItem><DescriptionItem term="Format">GGUF · Q4_K_M</DescriptionItem></DescriptionList>
          </Dialog>
        </ComponentExample>
        <ComponentExample title="Drawer">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Request details" description="req_98f3a2" footer={<Button fullWidth onClick={() => setDrawerOpen(false)}>Done</Button>}>
            <Stack gap="lg"><StatusBadge status="online">Complete</StatusBadge><DescriptionList><DescriptionItem term="Model">qwen-small</DescriptionItem><DescriptionItem term="Latency">112 ms</DescriptionItem><DescriptionItem term="Tokens">842</DescriptionItem></DescriptionList><CodeBlock>{`{"finish_reason":"stop"}`}</CodeBlock></Stack>
          </Drawer>
        </ComponentExample>
        <ComponentExample title="Popover">
          <Popover trigger={<Button variant="secondary">Open popover</Button>}><Stack gap="md"><Heading level={3} size="h5">Runtime status</Heading><StatusBadge status="online">Connected</StatusBadge><Text size="sm">Local API is responding at 127.0.0.1.</Text></Stack></Popover>
        </ComponentExample>
        <ComponentExample title="Dropdown menu">
          <DropdownMenu trigger={<Button variant="secondary">More actions</Button>}><DropdownItem>Duplicate model</DropdownItem><DropdownItem>View files</DropdownItem><DropdownItem>Export metadata</DropdownItem><Divider /><DropdownItem destructive>Remove model</DropdownItem></DropdownMenu>
        </ComponentExample>
        <ComponentExample title="Tooltips">
          <Inline gap="lg"><Tooltip content="Copy model identifier"><Button variant="ghost">Hover me</Button></Tooltip><Tooltip content="Refresh runtime status" side="right"><IconButton label="Refresh">↻</IconButton></Tooltip></Inline>
        </ComponentExample>
        <ComponentExample title="Command menu">
          <CommandMenu query="" onQueryChange={() => undefined} groups={[{ label: "Navigation", items: [{ id: "models", label: "Open models", description: "Browse installed and available models", shortcut: "G M" }, { id: "metrics", label: "Open metrics", description: "Inspect local performance", shortcut: "G P" }] }, { label: "Actions", items: [{ id: "install", label: "Install a model", shortcut: "I" }, { id: "connect", label: "Connect local runtime", shortcut: "C" }] }]} />
        </ComponentExample>
      </Grid>
    </Stack>
  );
}

function PatternsSection() {
  const [rating, setRating] = useState(4);
  return (
    <Stack gap="xl">
      <SectionHeader eyebrow="Patterns" title="Components composed into product workflows." description="The design language becomes useful when primitives form repeatable page, data, settings, and task patterns." />
      <ComponentExample title="Settings pattern" fullWidth>
        <Card>
          <CardHeader><div><Heading level={3} size="h4">Notifications</Heading><Text size="sm">Choose how baseui.sh communicates important system activity.</Text></div><Badge tone="success">Saved</Badge></CardHeader>
          <CardContent><Stack gap="lg"><Switch label="Model installation updates" description="Notify when a download completes or fails." defaultChecked /><Divider /><Switch label="Usage threshold alerts" description="Notify when monthly usage reaches 80%." defaultChecked /><Divider /><Switch label="Product announcements" description="Occasional release and migration notices." /></Stack></CardContent>
          <CardFooter><Button variant="secondary">Reset</Button><Button>Save changes</Button></CardFooter>
        </Card>
      </ComponentExample>
      <Grid columns={2} gap="lg">
        <ComponentExample title="Onboarding pattern">
          <Stack gap="lg"><Stepper items={[{ title: "Runtime", status: "complete" }, { title: "Model", status: "current" }, { title: "Test", status: "upcoming" }]} /><EmptyState compact icon="↓" title="Install your first model" description="Start with a compact model that runs on most modern laptops." actions={<Inline><Button>Install Qwen2.5</Button><Button variant="secondary">Browse catalogue</Button></Inline>} /></Stack>
        </ComponentExample>
        <ComponentExample title="Account pattern">
          <Stack gap="lg"><Inline gap="md"><Avatar initials="AM" size="xlarge" status="online" /><div><Heading level={3} size="h4">Alex Morgan</Heading><Text size="sm">alex@example.com</Text><Inline><Badge tone="accent">Pro</Badge><StatusBadge status="online">Active</StatusBadge></Inline></div></Inline><DescriptionList><DescriptionItem term="Organization">Wunder Corp</DescriptionItem><DescriptionItem term="Region">Switzerland</DescriptionItem><DescriptionItem term="Member since">March 2026</DescriptionItem></DescriptionList><Button variant="secondary" fullWidth>Edit profile</Button></Stack>
        </ComponentExample>
        <ComponentExample title="Usage summary pattern">
          <Stack gap="lg"><Inline justify="between"><div><Eyebrow>July allowance</Eyebrow><Heading level={3} size="h3">68% used</Heading></div><Badge tone="success">On track</Badge></Inline><Progress value={68} showValue /><Grid columns={3} gap="md"><Stat label="Requests" value="24.8k" /><Stat label="Tokens" value="8.4M" /><Stat label="Est. cost" value="$42.18" /></Grid><Alert tone="info">Allowance resets in 19 days.</Alert></Stack>
        </ComponentExample>
        <ComponentExample title="Review pattern">
          <Stack gap="lg"><div><Heading level={3} size="h4">How was your setup experience?</Heading><Text size="sm">Your feedback improves the default local workflow.</Text></div><Rating value={rating} readOnly={false} onChange={setRating} /><Field label="Additional feedback"><Textarea placeholder="Tell us what worked well or what felt unclear." /></Field><FormActions><Button>Submit feedback</Button></FormActions></Stack>
        </ComponentExample>
      </Grid>
      <ComponentExample title="Accordion and collapsible documentation patterns" fullWidth>
        <div id="installation" />
        <Stack gap="lg">
          <Accordion><AccordionItem title="Installation" description="Add the package and global stylesheet." open><CodeBlock>{`npm install @baseui.sh/react\n\nimport "@baseui.sh/react/styles.css";`}</CodeBlock></AccordionItem><AccordionItem title="Theming" description="Set light, dark, or system mode at the provider boundary."><CodeBlock>{`<BaseUIProvider theme="dark">\n  <Application />\n</BaseUIProvider>`}</CodeBlock></AccordionItem><AccordionItem title="Design invariants" description="Rules that should not be overridden in product code."><List divided><ListItem title="Radius" description="Always 4 px across controls, surfaces, and floating layers." /><ListItem title="Accent" description="Reserved for primary actions, focus, and active navigation." /><ListItem title="Monospace" description="Used for code, identifiers, measurements, and technical values only." /></List></AccordionItem></Accordion>
          <Collapsible title="Compact disclosure alias"><Text size="sm">Collapsible provides a concise disclosure API while retaining native details semantics.</Text></Collapsible>
        </Stack>
      </ComponentExample>
    </Stack>
  );
}

export function BaseUIShowcase({ theme, onThemeChange }: { theme: "light" | "dark"; onThemeChange: () => void }) {
  const [activeSection, setActiveSection] = useState<ShowcaseSection>("overview");
  const providerTheme: BaseUITheme = theme;
  const activeLabel = useMemo(() => sections.find((section) => section.id === activeSection)?.label ?? "Overview", [activeSection]);

  const content = activeSection === "overview" ? <OverviewSection />
    : activeSection === "foundations" ? <FoundationsSection />
    : activeSection === "actions" ? <ActionsSection />
    : activeSection === "forms" ? <FormsSection />
    : activeSection === "data" ? <DataSection />
    : activeSection === "feedback" ? <FeedbackSection />
    : activeSection === "navigation" ? <NavigationSection />
    : activeSection === "overlays" ? <OverlaysSection />
    : <PatternsSection />;

  return (
    <BaseUIProvider theme={providerTheme} className="baseui-showcase-root">
      <AppShell
        sidebar={
          <Sidebar
            brand={<button className="baseui-showcase-brand" type="button" onClick={() => setActiveSection("overview")}><LogoMark label="B" /><span><strong>baseui.sh</strong><small>Design system</small></span></button>}
            items={sections.map((section) => ({ id: section.id, label: section.label, icon: section.icon }))}
            activeItem={activeSection}
            onItemSelect={(item) => setActiveSection(item.id as ShowcaseSection)}
            footer={<Stack gap="sm"><StatusBadge status="online">v0.1.0</StatusBadge><Text size="xs">Apache-2.0 · React 18+</Text></Stack>}
          />
        }
        topbar={<Topbar title={activeLabel} leading={<Breadcrumbs items={[{ label: "baseui.sh" }, { label: activeLabel }]} />} actions={<Inline><Tooltip content="View source repository"><IconButton label="View source repository" onClick={() => window.open("https://github.com/baseui-sh/baseui", "_blank", "noopener,noreferrer")}>↗</IconButton></Tooltip><Button variant="secondary" size="small" onClick={onThemeChange}>{theme === "dark" ? "Light mode" : "Dark mode"}</Button><Avatar initials="BU" size="small" /></Inline>} />}
      >
        <Container size="wide">{content}</Container>
      </AppShell>
    </BaseUIProvider>
  );
}
