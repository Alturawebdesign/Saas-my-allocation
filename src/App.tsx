import { Routes, Route } from 'react-router-dom'
import { ChatProvider } from './lib/chatStore'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './pages/Dashboard'
import { FundList } from './pages/convictions/FundList'
import { FundDetail } from './pages/convictions/FundDetail'
import { Profiles } from './pages/allocations/Profiles'
import { ProfileDetail } from './pages/allocations/ProfileDetail'
import { Comparator } from './pages/allocations/Comparator'
import { AllocationDesigner } from './pages/allocations/AllocationDesigner'
import { Committees } from './pages/Committees'
import { Clients } from './pages/Clients'
import { Sources } from './pages/Sources'
import { Compliance } from './pages/Compliance'
import { Admin } from './pages/Admin'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="convictions" element={<FundList />} />
          <Route path="convictions/:id" element={<FundDetail />} />
          <Route path="allocations" element={<Profiles />} />
          <Route path="allocations/comparateur" element={<Comparator />} />
          <Route path="allocations/simulateur" element={<AllocationDesigner />} />
          <Route path="allocations/:id" element={<ProfileDetail />} />
          <Route path="comites" element={<Committees />} />
          <Route path="clients" element={<Clients />} />
          <Route path="sources" element={<Sources />} />
          <Route path="conformite" element={<Compliance />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ChatProvider>
  )
}
