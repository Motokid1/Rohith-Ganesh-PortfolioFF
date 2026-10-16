export const stages = [
  'Queued',
  'Analyzing',
  'Generating',
  'Validating',
  'Provisioning',
  'Deploying',
  'Verifying',
  'Complete',
];
export const scenarios: Record<
  string,
  { label: string; at: number; error: string; fix: string }
> = {
  success: { label: 'Successful example', at: -1, error: '', fix: '' },
  iam: {
    label: 'IAM permission failure',
    at: 4,
    error:
      'Terraform cannot create an EC2 instance: required IAM permission is missing.',
    fix: 'Review least-privilege permissions, validate the plan and retry the simulated provisioning step.',
  },
  docker: {
    label: 'Docker build timeout',
    at: 5,
    error: 'The illustrative container build exceeds its time budget.',
    fix: 'Inspect dependency downloads and build context, adjust the bounded timeout and retry.',
  },
  vpc: {
    label: 'VPC quota failure',
    at: 4,
    error: 'The example region has reached its VPC quota.',
    fix: 'Review existing networking or request an appropriate quota change before retrying.',
  },
  health: {
    label: 'Health verification failure',
    at: 6,
    error: 'The illustrative application health endpoint is unreachable.',
    fix: 'Inspect the container port, security group, routing and application health path before retrying.',
  },
};
export const stageNotes = [
  'Simulation queued; no AWS action will occur.',
  'Fixed sample identified: Python/FastAPI API, React/Vite UI, PostgreSQL service.',
  'Illustrative Dockerfile, Compose and Terraform previews prepared.',
  'Example configuration and permission checks reviewed.',
  'Simulated VPC, subnet, route, security group and EC2 resources appear.',
  'Simulated container build and application startup.',
  'Simulated GET /health verification; no request is sent.',
  'Synthetic deployment walkthrough complete.',
];
export const artifacts: Record<string, string> = {
  Dockerfile:
    'FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]',
  'Docker Compose':
    'services:\n  api:\n    build: .\n    ports: ["8000:8000"]\n    environment:\n      DATABASE_URL: ${DATABASE_URL:?provide securely}\n  database:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?provide securely}\n# Illustrative excerpt; no deployment is executed.',
  Terraform:
    'variable "region" { type = string }\nvariable "ami_id" { type = string }\nvariable "allowed_cidr" { type = string }\nprovider "aws" { region = var.region }\nresource "aws_vpc" "app" { cidr_block = "10.10.0.0/16" }\nresource "aws_subnet" "app" {\n  vpc_id = aws_vpc.app.id\n  cidr_block = "10.10.1.0/24"\n}\n# A source-review excerpt, not a complete runnable deployment.\n# AMI, routes, IAM and ingress policy require explicit configuration.',
  'AWS plan':
    'Illustrative plan\n+ VPC and application subnet\n+ Internet gateway and route table\n+ Restricted application security group\n+ EC2 application host\nReview region, IAM permissions, approved AMI, ingress and cost assumptions.\nNo Terraform command is run by this portfolio.',
};
