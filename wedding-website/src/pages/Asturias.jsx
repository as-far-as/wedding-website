import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';

export default function Asturias() {
  return (
    <PageLayout
      title="Asturias"
      subtitle="You're already in the best part of Spain. Stay a while."
    >

      <Section title="About the Region">
        <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.925rem' }}>
          Asturias sits on Spain's northern Atlantic coast, wedged between the Cantabrian Sea and the
          Picos de Europa. Green, wild, and almost comically beautiful — ancient pre-Romanesque churches
          on hillsides, centuries-old cider houses on cobbled streets, and inland valleys where the
          mountains press in from every side.
        </p>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          Unlike most of Spain, Asturias was never conquered by the Moors — it was the seed of the
          Reconquista. That history left a unique architectural legacy and a regional identity that
          remains fiercely its own. The food is extraordinary. The landscape will slow you down.
          It doesn't advertise itself, which is exactly why it's still worth going.
        </p>
      </Section>

      <Section title="Things to Do">
        <CardGrid>
          <Card title="Gijón">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Adán's city. Asturias's largest — a working port town with a 3km urban beach (Playa de
              San Lorenzo), a proper old port district (Cimadevilla) packed with sidrerias, and a
              working-class energy you won't find in the tourist brochures. Start here. Stay here.
              The shuttle to the wedding departs from here.
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>~1 hr from venue</p>
          </Card>

          <Card title="Picos de Europa">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              One of Spain's great national parks — dramatic limestone peaks, gorges, and mountain
              villages. The Cares Gorge (Ruta del Cares) is one of the best day hikes in Europe.
              Non-negotiable if you have a spare day.
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>~1.5 hrs from venue</p>
          </Card>

          <Card title="Costa Verde">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              The "Green Coast" — dramatic cliffs, unspoiled beaches, and small fishing towns along
              the whole Asturian shoreline. Highlights: Cudillero, Luarca, Playa de Torimbia.
              The kind of coastline that makes you wonder why anyone goes to the Med.
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>~1 hr from venue</p>
          </Card>

          <Card title="Covadonga">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              The mountain sanctuary where Pelayo defeated the Moors in 722 AD — the start of the
              Reconquista. A pink basilica built into a cliff face, glacial lakes above, and the Picos
              at your back. One of the stranger and more impressive places in Spain.
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>~1 hr from venue</p>
          </Card>

          <Card title="Oviedo">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              The regional capital. Compact, walkable, good old town. Santa María del Naranco is worth
              the trip — pre-Romanesque, 9th century, UNESCO heritage, and genuinely extraordinary.
              Worth a morning if you're passing through.
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>~45 min from venue</p>
          </Card>

          <Card title="Cangas del Narcea">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              A market town in the western valleys, known for local wine (yes, Asturias makes wine),
              monasteries, and the gateway to Muniellos Biosphere Reserve — one of the best-preserved
              oak forests in Europe. Quieter than the rest. Very good for a slow day.
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title="Food & Drink">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          Asturian food is hearty, abundant, and takes itself seriously. Exceptional local produce —
          dairy, seafood, game, pulses — and a natural cider culture that predates recorded history.
          You will eat well here. You will drink well here.
        </p>
        <div className="space-y-5">
          {[
            {
              name: 'Sidra (Cider)',
              desc: 'The lifeblood of Asturias. Natural, unfiltered, and poured from height ("escanciada") to aerate it — a ritual in every chigre (cider bar). Dry, tart, completely addictive. The bottle must be finished once opened. Gijón has the best bars.',
            },
            {
              name: 'Fabada Asturiana',
              desc: 'The signature dish — a slow-cooked stew of large white fabes beans with chorizo, morcilla (blood sausage), and lacón (cured pork shoulder). The Asturian answer to cassoulet, and arguably better. Order it at lunch. It will stop your afternoon.',
            },
            {
              name: 'Cachopo',
              desc: 'Two large breaded veal escalopes, stuffed with Asturian cheese and cured ham, then fried. Enormous. Order one between two. An Asturian institution and the best hangover cure known to science.',
            },
            {
              name: 'Marisco (Seafood)',
              desc: 'Asturian seafood is exceptional — percebes (barnacles), nécoras (velvet crabs), centollos (spider crab), merluza (hake). Go to the fish market in Gijón (Mercado del Sur) on a Saturday morning and order accordingly.',
            },
            {
              name: 'Queso de Cabrales',
              desc: 'A raw-milk blue cheese aged in mountain caves in the eastern Picos. Pungent, powerful, and extraordinary. Eat it with walnut honey and you will understand why people never leave Asturias.',
            },
          ].map(({ name, desc }) => (
            <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-5 border-b border-wedding-accent/15 last:border-0">
              <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '11rem' }}>{name}</span>
              <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Weather in August">
        <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.925rem' }}>
          August is Asturias's warmest month — but it's still the Atlantic. Warm days, cool evenings,
          and rain that can arrive at any point. The green landscape is green for a reason.
        </p>
        <ul className="font-sans text-wedding-muted space-y-2" style={{ fontSize: '0.9rem' }}>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">Daytime:</strong> 18–26°C. Sunshine is common, especially inland.</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">Evenings:</strong> Drops to 12–16°C once the sun goes. Bring a layer you like.</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">Rain:</strong> Real possibility any day. The venue has shelter and we have plans for changeable weather.</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">Sun cream:</strong> Still needed. Atlantic doesn't mean mild UV.</span></li>
        </ul>
      </Section>

    </PageLayout>
  );
}
