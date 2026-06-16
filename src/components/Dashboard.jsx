const imgEllipse = "https://www.figma.com/api/mcp/asset/247fd589-cb81-4aeb-9d83-72a281c51021";
const imgVector = "https://www.figma.com/api/mcp/asset/7c549e61-5af8-4180-9c50-51ff1e99e887";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/a6c9a1ba-5f21-438e-a4bd-a1f514cac58e";
const imgVector1 = "https://www.figma.com/api/mcp/asset/6fb39908-be0d-4b3e-a309-6aba5535dcaa";
const imgVector2 = "https://www.figma.com/api/mcp/asset/c9173aac-eaa1-474d-9490-73ef8747bc74";
const imgVector3 = "https://www.figma.com/api/mcp/asset/926b5309-eb7d-493b-b53a-df5262d4e8e3";
const imgEllipse2 = "https://www.figma.com/api/mcp/asset/d9def5fd-ea18-415e-bebe-2458650f62e0";
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/9408eeed-ce65-4b01-9bda-f46dcda727e1";
const imgEllipse4 = "https://www.figma.com/api/mcp/asset/d0ea4bcb-612c-4a25-8033-cbf76a99fdc4";
const imgIconCourses = "https://www.figma.com/api/mcp/asset/aa8bb783-1260-408b-95f1-407be7a930ba";
const imgIconBatches = "https://www.figma.com/api/mcp/asset/5e5caece-5bef-4475-92e8-ea24129d7c9d";
const imgIconCategories = "https://www.figma.com/api/mcp/asset/5ff35ccc-2df8-4097-8f61-9093b9f26bb1";
const imgIconModules = "https://www.figma.com/api/mcp/asset/6d220932-4090-4be2-a146-6f16783375a0";
const imgIconTopics = "https://www.figma.com/api/mcp/asset/cf09168b-aabf-4089-9c9f-e2175b92da2d";
const imgEllipse5 = "https://www.figma.com/api/mcp/asset/aa856b9e-ffc3-40d9-acb1-8cd4e9033dac";
const imgEllipse6 = "https://www.figma.com/api/mcp/asset/86e3595e-d6cf-4120-aa9c-b91208289cba";
const imgEllipse7 = "https://www.figma.com/api/mcp/asset/7375147b-e2df-45c1-b306-6389da99699c";
const imgEllipse8 = "https://www.figma.com/api/mcp/asset/9c7b490f-a977-4c72-941f-41755f50e489";
const imgEllipse9 = "https://www.figma.com/api/mcp/asset/d4f259e8-a36f-413d-b0fe-d5ba0f8aa4fb";
const imgFrame = "https://www.figma.com/api/mcp/asset/c8d4bd0d-abc6-4d7e-8a7b-e485fe0dc20b";

function Eyebrow({ label, link }) {
  return (
    <div className="flex items-center justify-between pb-[4px] pt-[15px] relative shrink-0 w-full">
      <p className="font-['Inter',sans-serif] font-semibold text-[11px] tracking-[1.2px] text-[#8893a4] uppercase">{label}</p>
      <p className="font-['Inter',sans-serif] font-semibold text-[13.5px] text-[#185fa5] cursor-pointer hover:underline">{link}</p>
    </div>
  );
}

function Sparkline({ src, dotSrc, dotTop }) {
  return (
    <div className="h-[50px] relative w-full mt-2">
      <div className="absolute left-[16px] top-[10px] right-[24px] h-[28px]">
        <img alt="" className="w-full h-full object-fill" src={src} />
      </div>
      <div className="absolute right-[4px] size-[7px]" style={{ top: dotTop }}>
        <img alt="" className="block size-full" src={dotSrc} />
      </div>
    </div>
  );
}

function KPICard({ icon, badge, badgeColor, badgeBg, value, label, sub, sparkSrc, dotTop }) {
  return (
    <div className="bg-white border border-[#e8ecf2] flex flex-1 flex-col items-start min-w-0 pl-[20px] pt-[18px] rounded-[16px] overflow-hidden">
      <div className="flex items-center justify-between w-full pr-[20px]">
        <div className="bg-[#eaf2fb] flex items-center justify-center rounded-[11px] size-[40px] shrink-0">
          <span className="text-[17px]">{icon}</span>
        </div>
        <div className="flex items-center px-[11px] py-[4px] rounded-[20px] shrink-0" style={{ background: badgeBg }}>
          <p className="font-['Inter',sans-serif] font-semibold text-[12px] whitespace-nowrap" style={{ color: badgeColor }}>{badge}</p>
        </div>
      </div>
      <div className="h-4 w-px" />
      <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[34px] tracking-[-1.5px] whitespace-nowrap">{value}</p>
      <div className="h-[9px] w-px" />
      <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[14px] whitespace-nowrap">{label}</p>
      <div className="h-[3px] w-px" />
      <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12.5px] whitespace-nowrap">{sub}</p>
      <Sparkline src={sparkSrc} dotSrc={imgEllipse1} dotTop={dotTop} />
    </div>
  );
}

function AlertCard({ color, count, label, action }) {
  return (
    <div className="flex flex-1 min-w-0 rounded-[14px] overflow-hidden border border-[#e8ecf2] bg-white">
      <div className="w-[4px] shrink-0" style={{ background: color }} />
      <div className="flex flex-col p-[15px] gap-[2px]">
        <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[28px] tracking-[-1px]">{count}</p>
        <p className="font-['Inter',sans-serif] font-medium text-[#3a4658] text-[13px]">{label}</p>
        <div className="h-[5px]" />
        <p className="font-['Inter',sans-serif] font-semibold text-[11px] tracking-[0.8px] text-[#185fa5] uppercase cursor-pointer">{action} →</p>
      </div>
    </div>
  );
}

function BarRow({ color, label, value, pct, maxPct = 100 }) {
  const fill = (pct / maxPct) * 100;
  return (
    <div className="flex items-center gap-[8px] w-full">
      <div className="w-[10px] h-[10px] rounded-[2px] shrink-0" style={{ background: color }} />
      <p className="font-['Inter',sans-serif] text-[#3a4658] text-[13px] w-[80px] shrink-0">{label}</p>
      <div className="flex-1 h-[8px] bg-[#f4f6fa] rounded-[6px] overflow-hidden">
        <div className="h-full rounded-[6px]" style={{ width: `${fill}%`, background: color }} />
      </div>
      <p className="font-['Inter',sans-serif] font-bold text-[#0f1b2d] text-[13px] w-[30px] text-right shrink-0">{value}</p>
      <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12px] w-[38px] shrink-0">{pct}%</p>
    </div>
  );
}

function TableRow({ label, value, border = true }) {
  return (
    <div className={`flex items-center justify-between py-[11px] w-full ${border ? 'border-b border-[#f0f2f6]' : ''}`}>
      <p className="font-['Inter',sans-serif] text-[#3a4658] text-[13px]">{label}</p>
      <p className="font-['Inter',sans-serif] font-bold text-[#0f1b2d] text-[13px]">{value}</p>
    </div>
  );
}

function DonutChart({ size, strokeWidth, segments, center, sub }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const paths = segments.map((seg, i) => {
    const dash = (seg.pct / 100) * circ;
    const gap = circ - dash;
    const el = (
      <circle
        key={i}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset + circ * 0.25}
        strokeLinecap="round"
        style={{ transform: `rotate(-90deg)`, transformOrigin: '50% 50%' }}
      />
    );
    offset += dash;
    return el;
  });
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f2f6" strokeWidth={strokeWidth} />
        {paths}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[22px] tracking-[-0.5px]">{center}</p>
        <p className="font-['Inter',sans-serif] font-semibold text-[#8893a4] text-[9px] tracking-[1px] uppercase">{sub}</p>
      </div>
    </div>
  );
}

function BarChart({ data, maxVal }) {
  return (
    <div className="flex items-end gap-[14px] h-[160px] w-full">
      {data.map((d, i) => {
        const h = Math.round((d.value / maxVal) * 140);
        return (
          <div key={i} className="flex flex-col items-center gap-[6px] flex-1">
            <p className="font-['Inter',sans-serif] text-[#8893a4] text-[11px]">{d.value}</p>
            <div className="w-[32px] rounded-t-[4px]" style={{ height: h, background: d.color }} />
            <p className="font-['Inter',sans-serif] text-[#8893a4] text-[11px] whitespace-nowrap">{d.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function FunnelRow({ num, color, label, value, pct }) {
  const fill = pct;
  return (
    <div className="flex items-center gap-[12px] w-full">
      <div className="flex items-center justify-center rounded-[15px] size-[30px] shrink-0" style={{ background: color }}>
        <p className="font-['Inter',sans-serif] font-extrabold text-white text-[13px]">{num}</p>
      </div>
      <div className="flex-1 h-[8px] bg-[#f4f6fa] rounded-[6px] overflow-hidden">
        <div className="h-full rounded-[6px]" style={{ width: `${fill}%`, background: color }} />
      </div>
      <p className="font-['Inter',sans-serif] font-semibold text-[#3a4658] text-[12.5px] w-[96px] shrink-0">{label}</p>
      <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[14px] text-right w-[30px] shrink-0">{value}</p>
    </div>
  );
}

function GaugeHalf({ pct, label }) {
  const r = 50;
  const circ = Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 110, height: 62 }}>
        <svg width={110} height={62} viewBox="0 0 110 62">
          <path d="M 5 58 A 50 50 0 0 1 105 58" fill="none" stroke="#f0f2f6" strokeWidth={10} strokeLinecap="round" />
          <path d="M 5 58 A 50 50 0 0 1 105 58" fill="none" stroke="#185fa5" strokeWidth={10} strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`} />
        </svg>
      </div>
      <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[27px] tracking-[-1px] -mt-2">{pct}%</p>
      <div className="h-2" />
      <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12px] text-center">{label}</p>
    </div>
  );
}

function StatusBar({ segments }) {
  return (
    <div className="flex w-full h-[13px] rounded-[6px] overflow-hidden gap-px">
      {segments.map((s, i) => (
        <div key={i} className="h-full" style={{ flex: s.pct, background: s.color }} />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-[#f4f6fa] flex flex-col gap-[18px] items-start pb-[70px] px-[60px] min-h-screen w-full">

      {/* Top bar */}
      <div className="flex items-center justify-between py-[20px] w-full">
        <p className="font-['Inter',sans-serif] font-extrabold text-[24px] tracking-[-0.5px]">
          <span className="text-[#0f1b2d]">Be</span>
          <span className="text-[#185fa5]">Lyv</span>
        </p>
        <div className="flex gap-[14px] items-center">
          <div className="bg-white border border-[#e8ecf2] flex items-center px-[12px] py-[9px] rounded-[10px] w-[240px]">
            <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px]">Search systems…</p>
          </div>
          <div className="flex gap-[9px] items-center">
            <div className="relative size-[34px] rounded-full overflow-hidden">
              <img alt="" className="absolute inset-0 size-full object-cover" src={imgEllipse} />
            </div>
            <div className="flex flex-col gap-px">
              <p className="font-['Inter',sans-serif] font-bold text-[#0f1b2d] text-[13px]">varun</p>
              <p className="font-['Inter',sans-serif] font-medium text-[#8893a4] text-[10px] tracking-[0.5px]">SUPER ADMIN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between w-full pb-[4px]">
        <div className="flex flex-col gap-[9px]">
          <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[30px] tracking-[-0.8px]">Welcome back, varun.</p>
          <div className="flex gap-[16px] items-center text-[13.5px]">
            <p className="font-['Inter',sans-serif] font-medium text-[#8893a4]">BT003</p>
            <p className="font-['Inter',sans-serif] text-[#8893a4]">varun@btreesystems.com</p>
            <p className="font-['Inter',sans-serif] font-semibold text-[#1f9d63]">● 0 alerts</p>
          </div>
        </div>
        <div className="bg-white border border-[#e8ecf2] flex gap-[6px] p-[5px] rounded-[12px]">
          <div className="bg-[#1e6fbe] flex items-center px-[18px] py-[9px] rounded-[9px]">
            <p className="font-['Inter',sans-serif] font-semibold text-white text-[13.5px] whitespace-nowrap">Overview</p>
          </div>
          <div className="flex items-center px-[18px] py-[9px] rounded-[9px]">
            <p className="font-['Inter',sans-serif] font-semibold text-[#3a4658] text-[13.5px] whitespace-nowrap">Console</p>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="flex gap-[18px] w-full">
        <KPICard icon="👥" badge="↑ 1 today" badgeColor="#1f9d63" badgeBg="#e7f6ee"
          value="1,036" label="Total Users" sub="1,035 active"
          sparkSrc={imgVector} dotTop="6.5px" />
        <KPICard icon="📚" badge="2 on hold" badgeColor="#3a4658" badgeBg="#eff2f6"
          value="47" label="Active Batches" sub="of 126 total"
          sparkSrc={imgVector1} dotTop="22.5px" />
        <KPICard icon="💳" badge="↓ 92 EMIs due" badgeColor="#c9821b" badgeBg="#fbf1e0"
          value="₹11.2L" label="Pending Revenue" sub="₹3.6L collected this month"
          sparkSrc={imgVector2} dotTop="34.5px" />
        <KPICard icon="💼" badge="ready to hire" badgeColor="#3a4658" badgeBg="#eff2f6"
          value="79" label="Placement Pool" sub="0 placed this month"
          sparkSrc={imgVector3} dotTop="8.5px" />
      </div>

      {/* Alerts */}
      <Eyebrow label="NEEDS YOUR ATTENTION" link="All alerts →" />
      <div className="flex gap-[18px] w-full">
        <AlertCard color="#e05252" count="42" label="Batches at risk" action="REVIEW" />
        <AlertCard color="#c9821b" count="92" label="EMIs overdue" action="COLLECT DUES" />
        <AlertCard color="#8893a4" count="1,029" label="First-login pending" action="REMIND" />
        <AlertCard color="#6b4fd8" count="1" label="Suspicious logins" action="INVESTIGATE" />
        <AlertCard color="#3a4658" count="7" label="Recordings failed" action="RETRY" />
      </div>

      {/* People & Access */}
      <Eyebrow label="PEOPLE & ACCESS" link="Manage users →" />
      <div className="flex gap-[18px] w-full">
        {/* People by role */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">People by role</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">1,034 users · students lead the base</p>
          <div className="h-4" />
          <div className="flex items-center gap-[24px]">
            <DonutChart size={150} strokeWidth={18}
              segments={[
                { pct: 84.5, color: '#185fa5' },
                { pct: 14.7, color: '#4da6e0' },
                { pct: 0.3, color: '#a8d4f0' },
                { pct: 0.2, color: '#d0e9f8' },
                { pct: 0.2, color: '#e8f4fc' },
              ]}
              center="1,034" sub="USERS" />
            <div className="flex flex-col gap-[10px] flex-1">
              <BarRow color="#185fa5" label="Students" value="874" pct={84.5} />
              <BarRow color="#4da6e0" label="Trainers" value="152" pct={14.7} />
              <BarRow color="#a8d4f0" label="Admins" value="3" pct={0.3} />
              <BarRow color="#d0e9f8" label="Consultants" value="2" pct={0.2} />
              <BarRow color="#e8f4fc" label="Staff" value="2" pct={0.2} />
              <BarRow color="#f4f8fd" label="BTC" value="1" pct={0.1} />
            </div>
          </div>
        </div>

        {/* User status */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">User status</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">Onboarding still the bottleneck</p>
          <div className="h-4" />
          <StatusBar segments={[
            { pct: 50, color: '#185fa5' },
            { pct: 48, color: '#e8ecf2' },
            { pct: 1, color: '#4da6e0' },
            { pct: 1, color: '#e05252' },
          ]} />
          <div className="h-3" />
          <TableRow label="● Active" value="1,035" />
          <TableRow label="● First-login pending" value="1,029" />
          <TableRow label="● Logged in today" value="1" />
          <TableRow label="● Suspicious" value="1" border={false} />
        </div>
      </div>

      {/* Learning Catalogue */}
      <Eyebrow label="LEARNING CATALOGUE" link="Manage courses →" />
      <div className="flex w-full bg-white border border-[#e8ecf2] rounded-[16px] overflow-hidden">
        {[
          { icon: imgIconCourses, val: '72', label: 'Courses' },
          { icon: imgIconBatches, val: '126', label: 'Batches' },
          { icon: imgIconCategories, val: '10', label: 'Categories' },
          { icon: imgIconModules, val: '69', label: 'Modules' },
          { icon: imgIconTopics, val: '363', label: 'Topics' },
        ].map((item, i) => (
          <div key={i} className={`flex flex-1 items-center gap-[13px] px-[20px] py-[18px] ${i < 4 ? 'border-r border-[#e8ecf2]' : ''}`}>
            <div className="bg-[#eaf2fb] rounded-[10px] size-[40px] flex items-center justify-center shrink-0">
              <img alt="" className="size-[20px] object-contain" src={item.icon} />
            </div>
            <div>
              <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[26px] tracking-[-0.5px]">{item.val}</p>
              <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12px]">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lifecycle row */}
      <div className="flex gap-[18px] w-full">
        {/* Student lifecycle */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Student lifecycle</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">596 completed · +16 new this month · 1 dropped</p>
          <div className="h-4" />
          <BarChart maxVal={600} data={[
            { label: 'Completed', value: 596, color: '#185fa5' },
            { label: 'In Progress', value: 92, color: '#4da6e0' },
            { label: 'Placed', value: 67, color: '#1f9d63' },
            { label: 'Discont.', value: 60, color: '#e05252' },
            { label: 'On Hold', value: 25, color: '#c9821b' },
            { label: 'Yet to Start', value: 24, color: '#8893a4' },
          ]} />
        </div>

        {/* Batch health */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Batch health</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">Avg recovery 3.9%</p>
          <div className="h-4" />
          <div className="flex items-center gap-[28px]">
            <DonutChart size={110} strokeWidth={14}
              segments={[
                { pct: 30, color: '#185fa5' },
                { pct: 43, color: '#1f9d63' },
                { pct: 27, color: '#e05252' },
              ]}
              center="156" sub="BATCHES" />
            <div className="flex flex-col gap-[10px] flex-1">
              <BarRow color="#185fa5" label="Active" value="47" pct={30} />
              <BarRow color="#1f9d63" label="Completed" value="67" pct={43} />
              <BarRow color="#e05252" label="At Risk" value="42" pct={27} />
            </div>
          </div>
          <div className="h-4" />
          <TableRow label="Handover approved" value="17" />
          <TableRow label="Transfer approved" value="50" border={false} />
        </div>
      </div>

      {/* Finance */}
      <Eyebrow label="FINANCE" link="View ledger →" />
      <div className="flex gap-[18px] w-full">
        {/* Revenue flow */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Revenue flow</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">798 fully paid · ₹3.6L collected this month</p>
          <div className="h-5" />
          <div className="flex flex-col gap-[14px]">
            {[
              { label: 'Collected', color: '#185fa5', pct: 24, value: '₹3.6L' },
              { label: 'Pending', color: '#c9821b', pct: 76, value: '₹11.2L' },
              { label: 'Expense', color: '#e8ecf2', pct: 6, value: '₹35K' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-[14px]">
                <p className="font-['Inter',sans-serif] text-[#3a4658] text-[13px] w-[90px] shrink-0">{r.label}</p>
                <div className="flex-1 h-[9px] bg-[#f4f6fa] rounded-[6px] overflow-hidden">
                  <div className="h-full rounded-[6px]" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
                <p className="font-['Inter',sans-serif] font-bold text-[#0f1b2d] text-[13px] w-[50px] text-right shrink-0">{r.value}</p>
              </div>
            ))}
          </div>
          <div className="h-5" />
          <div className="flex gap-[1px] border border-[#e8ecf2] rounded-[12px] overflow-hidden">
            {[
              { val: '1,173', label: 'Approved' },
              { val: '1', label: 'Pending' },
              { val: '798', label: 'Fully Paid' },
            ].map((s, i) => (
              <div key={i} className={`flex flex-col py-[13px] px-[14px] flex-1 ${i < 2 ? 'border-r border-[#e8ecf2]' : ''}`}>
                <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[22px] tracking-[-0.5px]">{s.val}</p>
                <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12px] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EMI collection */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">EMI collection</p>
              <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">₹11.2L outstanding across installments</p>
            </div>
            <div className="bg-[#fbf1e0] px-[10px] py-[4px] rounded-[20px]">
              <p className="font-['Inter',sans-serif] font-semibold text-[#c9821b] text-[12px]">92 overdue</p>
            </div>
          </div>
          <div className="h-5" />
          <div className="flex gap-[10px]">
            {['EMI 1', 'EMI 2', 'EMI 3', 'EMI 4'].map((emi, i) => (
              <div key={i} className="flex-1 bg-[#f4f6fa] rounded-[12px] p-[14px]">
                <p className="font-['Inter',sans-serif] font-semibold text-[#8893a4] text-[11px] tracking-[0.5px]">{emi}</p>
                <p className="font-['Inter',sans-serif] font-extrabold text-[#e05252] text-[36px] tracking-[-1.5px] mt-2">34</p>
                <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12px] mt-1">overdue</p>
                <div className="h-[5px] bg-[#e05252] rounded-full mt-3 opacity-30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operations & Security */}
      <Eyebrow label="OPERATIONS & SECURITY" link="View all →" />
      <div className="flex gap-[18px] w-full">
        {/* Storage */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Storage</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">0.22 GB of 500 GB</p>
          <div className="h-4" />
          <div className="flex items-center gap-[18px]">
            <DonutChart size={96} strokeWidth={12}
              segments={[{ pct: 0.04, color: '#185fa5' }]}
              center="0.04%" sub="USED" />
            <div>
              <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[24px] tracking-[-0.5px]">499.78 GB</p>
              <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">available</p>
            </div>
          </div>
          <div className="h-5" />
          <div className="flex gap-[1px] border border-[#e8ecf2] rounded-[12px] overflow-hidden">
            {[
              { val: '13', label: 'Ready' },
              { val: '5', label: 'Pending' },
              { val: '7', label: 'Failed' },
            ].map((s, i) => (
              <div key={i} className={`flex flex-col py-[13px] px-[14px] flex-1 ${i < 2 ? 'border-r border-[#e8ecf2]' : ''}`}>
                <p className="font-['Inter',sans-serif] font-extrabold text-[#0f1b2d] text-[22px] tracking-[-0.5px]">{s.val}</p>
                <p className="font-['Inter',sans-serif] text-[#8893a4] text-[12px] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trainers */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Trainers</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">157 total</p>
          <div className="h-4" />
          <div className="flex flex-col gap-[14px]">
            {[
              { label: 'Active', color: '#185fa5', pct: 38, value: '60' },
              { label: 'Inactive', color: '#e8ecf2', pct: 62, value: '97' },
              { label: 'With batch', color: '#1f9d63', pct: 13, value: '21' },
              { label: 'Idle', color: '#c9821b', pct: 25, value: '39' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-[14px]">
                <p className="font-['Inter',sans-serif] text-[#3a4658] text-[13px] w-[80px] shrink-0">{r.label}</p>
                <div className="flex-1 h-[8px] bg-[#f4f6fa] rounded-[6px] overflow-hidden">
                  <div className="h-full rounded-[6px]" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
                <p className="font-['Inter',sans-serif] font-bold text-[#0f1b2d] text-[13px] w-[32px] text-right shrink-0">{r.value}</p>
              </div>
            ))}
          </div>
          <div className="h-3" />
          <TableRow label="Full-time / Freelance" value="14 / 70" border={false} />
        </div>

        {/* Security */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Security</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">Auth & onboarding</p>
          <div className="h-4" />
          <TableRow label="Suspicious users" value="1" />
          <TableRow label="Device violations" value="1" />
          <TableRow label="2FA enabled" value="0.4%" />
          <TableRow label="Google OAuth" value="0.1%" />
          <TableRow label="Invited (onboarding)" value="1" border={false} />
        </div>
      </div>

      {/* Placements */}
      <Eyebrow label="PLACEMENTS" link="Placement DB →" />
      <div className="flex gap-[18px] w-full">
        {/* Placement funnel */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Placement funnel</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">79 in active pool · 0% conversion this cycle</p>
          <div className="h-4" />
          <div className="flex flex-col gap-[12px]">
            <FunnelRow num="1" color="#185fa5" label="Active Pool" value="79" pct={100} />
            <FunnelRow num="2" color="#6b4fd8" label="In Interview" value="0" pct={3} />
            <FunnelRow num="3" color="#4da6e0" label="Attended" value="0" pct={3} />
            <FunnelRow num="4" color="#1f9d63" label="Selected" value="0" pct={3} />
            <FunnelRow num="5" color="#c9821b" label="Placed" value="0" pct={3} />
          </div>
        </div>

        {/* Conversion */}
        <div className="bg-white border border-[#e8ecf2] rounded-[16px] flex-1 p-[22px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[#0f1b2d] text-[15px]">Conversion</p>
          <p className="font-['Inter',sans-serif] text-[#8893a4] text-[13px] mt-1">Cycle performance</p>
          <div className="h-4" />
          <div className="flex gap-[16px] justify-center">
            <GaugeHalf pct={0} label="Interview → Offer" />
            <GaugeHalf pct={0} label="Attendance Rate" />
          </div>
          <div className="h-4" />
          <TableRow label="Placed (lifecycle)" value="67" />
          <TableRow label="Live sessions this week" value="0" border={false} />
        </div>
      </div>

    </div>
  );
}
