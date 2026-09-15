import { useState, useEffect, Children, isValidElement, type ReactElement } from 'react';
import CardGrid from './CardGrid' 
import sectionsDataRaw from './data.json'

type Section = {
  id: string;
  title: string;
};

type CardData = {
  id: string;
  icon: string;
  link: string;
  title: string;
};


type SectionsData = Record<string, CardData[]>;

const sectionsData = sectionsDataRaw as SectionsData;

// The only place you add/remove/rename a section - nothing below this
// needs to change when you add Stage 5, rename Stage 2, etc.

const SECTIONS: Section[] = [
  { id: 'general', title: 'General' },
  { id: 'stage-1', title: 'Stage 1' },
  { id: 'stage-2', title: 'Stage 2' },
  { id: 'stage-3', title: 'Stage 3' },
  { id: 'stage-4', title: 'Stage 4' },
];

export default function TrickToggle() {


  // One object keyed by section id, instead of one useState per section.
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [supportsInterpolateSize, setSupportsInterpolateSize] = useState(true);

  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports) {
      setSupportsInterpolateSize(CSS.supports('interpolate-size', 'allow-keywords'));
    }

  }, []);

  const allOpen = SECTIONS.every((section) => openMap[section.id]);

  const toggleOne = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const opening = !allOpen;
    setOpenMap(Object.fromEntries(SECTIONS.map((section) => [section.id, opening])));
  };

  return (
    <>
      <button className="cta" type="button" onClick={toggleAll}>
        {allOpen ? 'Collapse all' : 'Expand all'}
      </button>

      <section className="grid">
        {SECTIONS.map(({ id, title }) => {
          
          const open = !!openMap[id];

          return (
            <article className={`stage ${id}`} key={id}>
              <div className="box">
                {/* Panel button */}
                <button
                  className="trigger"
                  type="button"
                  aria-expanded={open}
                  aria-controls={`panel-${id}`}
                  onClick={() => toggleOne(id)}
                >
                  {title}
                  <span className="sign" aria-hidden="true">{open ? '−' : '+'}</span>
                </button>

                <div className={`panel${open ? ' is-open' : ''}`} id={`panel-${id}`}>
                  <div className="panel-content">
                  <CardGrid cards={sectionsData[id] ?? []} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}