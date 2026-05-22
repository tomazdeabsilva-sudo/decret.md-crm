export type ContactStatus = 'Customer' | 'Active' | 'Lead' | 'Inactive';
export type DealStage = 'Prospecting' | 'Qualification' | 'Proposal' | 'Closed';

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ContactStatus;
  lastContact: string;
  dealValue: number;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: DealStage;
  probability: number;
  daysOpen: number;
  updatedAt: string;
}

export interface ChartPoint {
  month: string;
  revenue: number;
  leads: number;
}

export const contacts: Contact[] = [
  { id: 'c01', name: 'Ana Costa',       company: 'Vertex Systems',    email: 'ana@vertex.io',                phone: '+55 11 98234-5678', status: 'Customer', lastContact: '2024-04-15', dealValue: 45000 },
  { id: 'c02', name: 'Bruno Martins',   company: 'DataPrime',         email: 'b.martins@dataprime.com.br',   phone: '+55 21 99876-1234', status: 'Active',   lastContact: '2024-04-12', dealValue: 28000 },
  { id: 'c03', name: 'Carla Souza',     company: 'NexoTech',          email: 'carla@nexotech.io',            phone: '+55 11 97654-3210', status: 'Lead',     lastContact: '2024-04-10', dealValue: 0     },
  { id: 'c04', name: 'Diego Almeida',   company: 'Fuse Analytics',    email: 'diego@fuseanalytics.com',     phone: '+55 31 98765-4321', status: 'Customer', lastContact: '2024-04-08', dealValue: 72000 },
  { id: 'c05', name: 'Elisa Ferreira',  company: 'CloudSpark',        email: 'e.ferreira@cloudspark.com.br', phone: '+55 51 99234-8765', status: 'Inactive', lastContact: '2024-02-20', dealValue: 15000 },
  { id: 'c06', name: 'Felipe Nunes',    company: 'BridgeSoft',        email: 'fnunes@bridgesoft.io',         phone: '+55 11 93456-7890', status: 'Lead',     lastContact: '2024-04-14', dealValue: 0     },
  { id: 'c07', name: 'Gabriela Lima',   company: 'Orbit Finance',     email: 'glima@orbitfinance.com',       phone: '+55 11 91234-5678', status: 'Customer', lastContact: '2024-04-01', dealValue: 95000 },
  { id: 'c08', name: 'Henrique Vieira', company: 'StackLab',          email: 'h.vieira@stacklab.com.br',    phone: '+55 21 94567-8901', status: 'Active',   lastContact: '2024-04-09', dealValue: 33000 },
  { id: 'c09', name: 'Isabella Rocha',  company: 'Momentum SaaS',     email: 'irocha@momentumsaas.com',     phone: '+55 11 92345-6789', status: 'Lead',     lastContact: '2024-04-13', dealValue: 0     },
  { id: 'c10', name: 'João Cardoso',    company: 'ProField',          email: 'jcardoso@profield.io',         phone: '+55 41 97890-1234', status: 'Customer', lastContact: '2024-03-28', dealValue: 58000 },
  { id: 'c11', name: 'Katia Mendes',    company: 'Axle Group',        email: 'k.mendes@axlegroup.com.br',   phone: '+55 85 98901-2345', status: 'Inactive', lastContact: '2024-01-15', dealValue: 9000  },
  { id: 'c12', name: 'Lucas Fonseca',   company: 'Zenith Consulting', email: 'lfonseca@zenith.com',          phone: '+55 11 96789-0123', status: 'Active',   lastContact: '2024-04-11', dealValue: 41000 },
];

export const deals: Deal[] = [
  { id: 'd01', title: 'Plataforma de Analytics',  company: 'NexoTech',          contact: 'Carla Souza',     value: 18000, stage: 'Prospecting',   probability: 15,  daysOpen: 3,  updatedAt: '2024-04-14' },
  { id: 'd02', title: 'Migração Cloud',            company: 'Axle Group',        contact: 'Katia Mendes',    value: 32000, stage: 'Prospecting',   probability: 10,  daysOpen: 7,  updatedAt: '2024-04-10' },
  { id: 'd03', title: 'ERP Integration',           company: 'ProField',          contact: 'João Cardoso',    value: 24000, stage: 'Prospecting',   probability: 20,  daysOpen: 5,  updatedAt: '2024-04-12' },
  { id: 'd04', title: 'Suite de BI',               company: 'StackLab',          contact: 'Henrique Vieira', value: 45000, stage: 'Qualification', probability: 35,  daysOpen: 14, updatedAt: '2024-04-08' },
  { id: 'd05', title: 'CRM Enterprise',            company: 'BridgeSoft',        contact: 'Felipe Nunes',    value: 72000, stage: 'Qualification', probability: 40,  daysOpen: 21, updatedAt: '2024-04-05' },
  { id: 'd06', title: 'Automação de Vendas',       company: 'Momentum SaaS',     contact: 'Isabella Rocha',  value: 28000, stage: 'Qualification', probability: 30,  daysOpen: 9,  updatedAt: '2024-04-11' },
  { id: 'd07', title: 'Dashboard Executivo',       company: 'Orbit Finance',     contact: 'Gabriela Lima',   value: 95000, stage: 'Proposal',      probability: 65,  daysOpen: 28, updatedAt: '2024-04-02' },
  { id: 'd08', title: 'Segurança & Compliance',    company: 'Vertex Systems',    contact: 'Ana Costa',       value: 53000, stage: 'Proposal',      probability: 70,  daysOpen: 18, updatedAt: '2024-04-04' },
  { id: 'd09', title: 'Data Pipeline',             company: 'DataPrime',         contact: 'Bruno Martins',   value: 38000, stage: 'Proposal',      probability: 55,  daysOpen: 35, updatedAt: '2024-03-28' },
  { id: 'd10', title: 'Infraestrutura DevOps',     company: 'CloudSpark',        contact: 'Elisa Ferreira',  value: 67000, stage: 'Closed',        probability: 100, daysOpen: 45, updatedAt: '2024-04-01' },
  { id: 'd11', title: 'Portal B2B',                company: 'Fuse Analytics',    contact: 'Diego Almeida',   value: 44000, stage: 'Closed',        probability: 100, daysOpen: 62, updatedAt: '2024-03-20' },
  { id: 'd12', title: 'App Mobile',                company: 'Zenith Consulting', contact: 'Lucas Fonseca',   value: 29000, stage: 'Closed',        probability: 100, daysOpen: 38, updatedAt: '2024-03-25' },
];

export const chartData: ChartPoint[] = [
  { month: 'Nov', revenue: 185000, leads: 18 },
  { month: 'Dez', revenue: 210000, leads: 22 },
  { month: 'Jan', revenue: 195000, leads: 20 },
  { month: 'Fev', revenue: 240000, leads: 26 },
  { month: 'Mar', revenue: 225000, leads: 24 },
  { month: 'Abr', revenue: 284500, leads: 31 },
];

export const kpis = {
  totalSales: 284500,
  totalSalesGrowth: 12.5,
  activeLeads: 24,
  activeLeadsGrowth: 8.3,
  conversionRate: 18.2,
  conversionRateGrowth: 2.1,
  avgDealSize: 11854,
  avgDealSizeGrowth: -4.2,
};