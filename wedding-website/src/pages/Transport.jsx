import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';

export default function Transport() {
  return (
    <PageLayout
      title="Transport"
      subtitle="Getting to Valle de Bueida, Quirós"
    >

      <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-12">
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
          <strong className="text-wedding-text">The short version:</strong> Fly into Asturias (OVD) or Santander (SDR) — both have direct flights from the UK and you'll be at the site in under 2.5 hours. Hire a car and you're sorted. If you're coming from further afield, Madrid connects to everywhere and has a fast train north.
        </p>
      </div>

      <Section title="By Plane">
        <CardGrid>
          <Card title="Asturias Airport (OVD) — Best option">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              The closest airport. Located between Avilés and Gijón, about 1 hour 20 minutes from the venue. Direct flights from London Stansted, Amsterdam, Dublin, and Frankfurt.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~1 hr 20 min to venue by car</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Direct: London Stansted, Amsterdam, Dublin, Frankfurt</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Airlines: Ryanair, Transavia, Eurowings</span></li>
            </ul>
          </Card>

          <Card title="Santander Airport (SDR)">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              2 hours 30 minutes from the site. Good option from Edinburgh or Dublin, or if you're coming by Brittany Ferries from Portsmouth — great for anyone bringing a car. The coastal drive west is excellent.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~2 hr 30 min to venue by car</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Direct: Edinburgh, London, Dublin</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Brittany Ferries: Portsmouth → Santander</span></li>
            </ul>
          </Card>

          <Card title="Madrid Barajas (MAD)">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Most international connections route through Madrid. Fly in, hire a car and drive north through the mountains (spectacular), or take the Alvia train to Oviedo — about 3.5 hours — and arrange onward transport from there.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~4.5 hrs by car (A-66 north)</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Alvia train to Oviedo: ~3.5 hrs</span></li>
            </ul>
          </Card>

          <Card title="Bilbao (BIO) — Further than it looks">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Bilbao is further than it looks on the map — closer to 3 hours from the venue. Only worth flying into if you're planning to spend time in the Basque Country first and drive west. The pintxos in San Sebastián will ease the journey.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~2 hr 45 min to venue by car</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Worth it only if you're doing the Basque coast road trip</span></li>
            </ul>
          </Card>
        </CardGrid>
      </Section>

      <Section title="By Car">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          A car is the most practical way to move around Asturias. The venue is in a rural valley off the AS-228 — GPS gets you most of the way. We'll share exact coordinates and any tricky junctions closer to the date.
        </p>
        <div className="space-y-3">
          {[
            { from: 'Asturias Airport (OVD)', dist: '~70 km',  time: '~1 hr 20 min',  route: 'A-66 south, exit Villazón, AS-228' },
            { from: 'Gijón',                  dist: '~60 km',  time: '~1 hr',          route: 'A-66 south from Oviedo, exit Villazón' },
            { from: 'Oviedo',                  dist: '~40 km',  time: '~45 min',        route: 'A-66 south, exit Villazón, AS-228' },
            { from: 'Santander',               dist: '~185 km', time: '~2 hr 30 min',  route: 'A-8 west to Oviedo, then A-66 south' },
            { from: 'Bilbao',                  dist: '~220 km', time: '~2 hr 45 min',  route: 'A-8 west to Oviedo, then A-66 south' },
            { from: 'Madrid',                  dist: '~450 km', time: '~4.5 hrs',       route: 'A-66 north through the Asturian mountains' },
          ].map(({ from, dist, time, route }) => (
            <div key={from} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-wedding-accent/15 last:border-0">
              <span className="font-display font-bold text-wedding-text shrink-0" style={{ fontWeight: 700, minWidth: '13rem' }}>{from}</span>
              <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                {dist} · {time} — <span className="text-wedding-muted/70">{route}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="By Train">
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          The Alvia runs between Madrid and Oviedo — journey time is now around 3.5 hours since the Variante de Pajares tunnel opened. From Oviedo station, it's just under an hour to the venue by car. You'll need to hire a car or sort a taxi from there.
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-5">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Pola de Lena station</strong> is just 31 minutes from the venue and some Alvia services stop here — worth checking if you're travelling from Madrid by train and have car access at the other end. Not all services stop; verify on RENFE before booking.
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          Renfe Cercanías runs local trains along the Asturian coast between Gijón, Oviedo, and Avilés — useful for getting around the coast once you've arrived.
        </p>
      </Section>

      <Section title="On the Day — Shuttle Bus">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          A return shuttle runs from Gijón to the venue on Saturday. Don't want to drive? Don't. Take the bus, drink freely, and let someone else handle the mountain roads.
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-7">
          <p className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Pickup: Gijón.</strong> Exact departure point and times TBC — this page will be updated when finalised. Flag it in your RSVP if the shuttle is central to your plans.
          </p>
        </div>
        <CardGrid>
          <Card title="Parking">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Parking is on-site. If you're driving, plan ahead for not drinking or arrange a lift back. Taxi contacts will be in your invitation — Uber and Cabify don't cover this area. Book local in advance for late-night runs.
            </p>
          </Card>
          <Card title="Gijón as a Base">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Adán's city. Good hotels, a 3km beach (Playa de San Lorenzo), and the best sidra bar scene in Asturias. The obvious base for the weekend — and the shuttle pickup point. See the Accommodation page for more.
            </p>
          </Card>
        </CardGrid>
      </Section>

    </PageLayout>
  );
}
