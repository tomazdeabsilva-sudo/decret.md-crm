'use client';

import { useState, useMemo } from 'react';
import { contacts, deals, chartData, kpis } from '../data/mock';
import type { ContactStatus, DealStage } from '../data/mock';

type View = 'dashboard' | 'contacts' | 'pipeline';

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconKanban = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="5" height="18" /><rect x="10" y="3" width="5" height="12" /><rect x="17" y="3" width="4" height="8" />
  </svg>
);
const IconSearch = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconUp = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);
const IconDown = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
);

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ContactStatus, { label: string; cls: string }> = {
  Customer: { label: 'Cliente', cls: 'bg-zinc-900 text-white' },
  Active:   { label: 'Ativo',   cls: 'bg-zinc-200 text-zinc-800' },
  Lead:     { label: 'Lead',    cls: 'border border-zinc-400 text-zinc-600' },
  Inactive: { label: 'Inativo', cls: 'border border-zinc-200 text-zinc-400' },
};

const STAGES: DealStage[] = ['Prospecting', 'Qualification', 'Proposal', 'Closed'];

const STAGE_CONFIG: Record<DealStage, { label: string; accentBg: string }> = {
  Prospecting:   { label: 'Prospecção',   accentBg: 'bg-zinc-300' },
  Qualification: { label: 'Qualificação', accentBg: 'bg-zinc-500' },
  Proposal:      { label: 'Proposta',     accentBg: 'bg-zinc-800' },
  Closed:        { label: 'Fechado',      accentBg: 'bg-zinc-950' },
};

// ─── Utilities ───────────────────────────────────────────────────────────────

const fmt = {
  currency: (n: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n),
  date: (s: string) =>
    new Date(s + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }),
  compact: (n: number) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n),
};

// ─── Shared Components ───────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: ContactStatus }) => {
  const { label, cls } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-sm ${cls}`}>
      {label}
    </span>
  );
};

const KPICard = ({ label, value, growth }: { label: string; value: string; growth: number }) => (
  <div className="bg-white border border-zinc-200 p-5">
    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-2xl font-semibold text-zinc-950 tabular-nums leading-none">{value}</p>
    <div className={`flex items-center gap-1 mt-2.5 ${growth >= 0 ? 'text-zinc-600' : 'text-zinc-400'}`}>
      {growth >= 0 ? <IconUp /> : <IconDown />}
      <span className="text-[11px] tabular-nums">{Math.abs(growth)}% vs mês anterior</span>
    </div>
  </div>
);

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">{children}</p>
);

// ─── Dashboard ───────────────────────────────────────────────────────────────

const DashboardView = () => {
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));
  const CHART_H = 88;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard label="Receita Total"     value={fmt.currency(kpis.totalSales)}  growth={kpis.totalSalesGrowth} />
        <KPICard label="Leads Ativos"      value={String(kpis.activeLeads)}       growth={kpis.activeLeadsGrowth} />
        <KPICard label="Taxa de Conversão" value={`${kpis.conversionRate}%`}      growth={kpis.conversionRateGrowth} />
        <KPICard label="Ticket Médio"      value={fmt.currency(kpis.avgDealSize)} growth={kpis.avgDealSizeGrowth} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-zinc-200 p-5">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <SectionLabel>Receita Mensal</SectionLabel>
              <p className="text-sm font-semibold text-zinc-900 -mt-2">Últimos 6 meses</p>
            </div>
            <span className="text-xs text-zinc-400 tabular-nums">{fmt.currency(kpis.totalSales)}</span>
          </div>
          <div className="flex items-end gap-3" style={{ height: CHART_H }}>
            {chartData.map((d) => {
              const h = Math.max(4, Math.round((d.revenue / maxRevenue) * CHART_H));
              return (
                <div key={d.month} className="flex-1 flex flex-col justify-end items-center gap-1.5">
                  <span className="text-[9px] text-zinc-400 tabular-nums">{fmt.compact(d.revenue)}</span>
                  <div className="w-full bg-zinc-900" style={{ height: h }} />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 pt-2 mt-1 border-t border-zinc-100">
            {chartData.map((d) => (
              <div key={d.month} className="flex-1 text-center text-[10px] text-zinc-500">{d.month}</div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5">
          <SectionLabel>Pipeline por Estágio</SectionLabel>
          <div className="divide-y divide-zinc-100">
            {STAGES.map((stage) => {
              const sd = deals.filter((d) => d.stage === stage);
              const total = sd.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs font-medium text-zinc-800">{STAGE_CONFIG[stage].label}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{sd.length} negócio{sd.length !== 1 ? 's' : ''}</p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-950 tabular-nums">{fmt.currency(total)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200">
        <div className="px-5 py-3.5 border-b border-zinc-200 flex items-center justify-between">
          <SectionLabel>Negócios Recentes</SectionLabel>
          <span className="text-[10px] text-zinc-400 -mt-4">{deals.length} total</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              {[['Negócio','left'],['Empresa','left'],['Estágio','left'],['Valor','right'],['Prob.','right']].map(([h, a]) => (
                <th key={h} className={`px-5 py-2.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider text-${a}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deals.slice(0, 8).map((deal, i) => (
              <tr key={deal.id} className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${i % 2 === 1 ? 'bg-zinc-50/40' : ''}`}>
                <td className="px-5 py-3 text-sm font-semibold text-zinc-900">{deal.title}</td>
                <td className="px-5 py-3 text-sm text-zinc-500">{deal.company}</td>
                <td className="px-5 py-3 text-xs text-zinc-600">{STAGE_CONFIG[deal.stage].label}</td>
                <td className="px-5 py-3 text-sm font-semibold text-zinc-950 text-right tabular-nums">{fmt.currency(deal.value)}</td>
                <td className="px-5 py-3 text-sm text-zinc-500 text-right tabular-nums">{deal.probability}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Contacts ────────────────────────────────────────────────────────────────

const ContactsView = () => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-zinc-400 pointer-events-none"><IconSearch /></span>
          <input
            type="text"
            placeholder="Buscar por nome, empresa ou e-mail..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-zinc-300 bg-white w-80 outline-none focus:border-zinc-700 placeholder:text-zinc-400 transition-colors"
          />
        </div>
        <span className="text-xs text-zinc-400 tabular-nums">{filtered.length} de {contacts.length} contatos</span>
      </div>

      <div className="bg-white border border-zinc-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              {['Nome','Empresa','E-mail','Status','Valor','Último Contato'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${i % 2 === 1 ? 'bg-zinc-50/30' : ''}`}>
                <td className="px-5 py-3.5 text-sm font-semibold text-zinc-900">{c.name}</td>
                <td className="px-5 py-3.5 text-sm text-zinc-600">{c.company}</td>
                <td className="px-5 py-3.5 text-xs text-zinc-500 font-mono">{c.email}</td>
                <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                <td className="px-5 py-3.5 text-sm font-semibold text-zinc-950 tabular-nums">
                  {c.dealValue > 0 ? fmt.currency(c.dealValue) : <span className="text-zinc-300 font-normal">—</span>}
                </td>
                <td className="px-5 py-3.5 text-xs text-zinc-500 tabular-nums">{fmt.date(c.lastContact)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-zinc-400">Nenhum contato encontrado para &ldquo;{query}&rdquo;.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Pipeline ────────────────────────────────────────────────────────────────

const PipelineView = () => (
  <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 items-start">
    {STAGES.map((stage) => {
      const sd = deals.filter((d) => d.stage === stage);
      const total = sd.reduce((s, d) => s + d.value, 0);
      const { label, accentBg } = STAGE_CONFIG[stage];
      return (
        <div key={stage} className="flex flex-col gap-2.5">
          <div className="bg-white border border-zinc-200 overflow-hidden">
            <div className={`h-0.5 ${accentBg}`} />
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{label}</span>
                <span className="text-[10px] text-zinc-400 tabular-nums bg-zinc-100 px-1.5 py-0.5 rounded-sm">{sd.length}</span>
              </div>
              <p className="text-sm font-semibold text-zinc-950 tabular-nums">{fmt.currency(total)}</p>
            </div>
          </div>
          {sd.map((deal) => (
            <div key={deal.id} className="bg-white border border-zinc-200 p-3.5 hover:border-zinc-400 transition-colors cursor-pointer group">
              <p className="text-sm font-semibold text-zinc-900 leading-snug group-hover:text-zinc-950">{deal.title}</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">{deal.company}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-zinc-950 tabular-nums">{fmt.currency(deal.value)}</span>
                <span className="text-[10px] text-zinc-400 tabular-nums">{deal.probability}%</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                <span className="text-[10px] text-zinc-400">{deal.contact}</span>
                <span className="text-[10px] text-zinc-400 tabular-nums">{deal.daysOpen}d</span>
              </div>
            </div>
          ))}
        </div>
      );
    })}
  </div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV = [
  { id: 'dashboard' as const, label: 'Dashboard', Icon: IconGrid },
  { id: 'contacts'  as const, label: 'Contatos',  Icon: IconUsers },
  { id: 'pipeline'  as const, label: 'Pipeline',  Icon: IconKanban },
];

const Sidebar = ({ view, onChange }: { view: View; onChange: (v: View) => void }) => (
  <aside className="w-56 min-h-screen bg-zinc-950 flex flex-col shrink-0">
    <div className="h-14 flex items-center px-6 border-b border-zinc-800">
      <span className="text-white text-xs font-semibold tracking-[0.22em] uppercase">CRM</span>
    </div>
    <nav className="flex-1 pt-2">
      {NAV.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm transition-colors text-left ${
            view === id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Icon />
          {label}
        </button>
      ))}
    </nav>
    <div className="px-6 py-4 border-t border-zinc-800">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-300 font-semibold">U</div>
        <div>
          <p className="text-[11px] text-zinc-300 font-medium">Usuário</p>
          <p className="text-[10px] text-zinc-600">Admin</p>
        </div>
      </div>
    </div>
  </aside>
);

// ─── Topbar ──────────────────────────────────────────────────────────────────

const VIEW_META: Record<View, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Visão geral · Abril 2024' },
  contacts:  { title: 'Contatos',  subtitle: `${contacts.length} registros` },
  pipeline:  { title: 'Pipeline',  subtitle: `${deals.length} negócios em acompanhamento` },
};

const Topbar = ({ view }: { view: View }) => {
  const { title, subtitle } = VIEW_META[view];
  return (
    <header className="h-14 border-b border-zinc-200 bg-white flex items-center px-6 shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-zinc-950">{title}</h1>
        <p className="text-[11px] text-zinc-400 mt-0.5">{subtitle}</p>
      </div>
    </header>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [view, setView] = useState<View>('dashboard');
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar view={view} onChange={setView} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar view={view} />
        <main className="flex-1 overflow-auto p-6">
          {view === 'dashboard' && <DashboardView />}
          {view === 'contacts'  && <ContactsView />}
          {view === 'pipeline'  && <PipelineView />}
        </main>
      </div>
    </div>
  );
}