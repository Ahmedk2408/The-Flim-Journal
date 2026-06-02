import React from 'react';
import { Award, Shield, Film, PenTool, CheckCircle, ChevronRight, User } from 'lucide-react';

export const AboutView: React.FC = () => {
  const masthead = [
    {
      role: 'Editorial Direction',
      members: [
        { name: 'Arjun Mehta', title: 'Senior Editorial Director & Co-Founder', bio: 'Former Senior Editor of cinematic critique directories. Holding a PhD in Historical Cinematics from Columbia University.' },
        { name: 'Sophia Al-Kindi', title: 'Special Features Editor & Director Correspondent', bio: 'Cannes Selection Judge (2024-2025). Writes on European neo-realism.' }
      ]
    },
    {
      role: 'Staff Critics & Scholars',
      members: [
        { name: 'Evelyn Thorne', title: 'Chief Theatrical Critic', bio: 'Over 15 years in film evaluation. Specializes in structuralist Neo-Noir and digital cinematography evaluations.' },
        { name: 'Marcus Sterling', title: 'Senior Box Office & Distribution Analyst', bio: 'Investigates the intersection of studio financing protocols and international theatrical distribution pipelines.' }
      ]
    },
    {
      role: 'Production & Digital Curation',
      members: [
        { name: 'Claire Dubois', title: 'Artistic Director & Layout Curator', bio: 'Maintains cohesive typographies and visual standards across the print quarterly and digital platforms.' },
        { name: 'Nikhil Roy', title: 'Director of Archival Restorations', bio: 'Curator specializing in silent era preservation efforts and physical format restorations.' }
      ]
    }
  ];

  return (
    <div id="about-page-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Page Title & Vision Header */}
      <div className="text-center space-y-4 border-b border-[#2E2E2E] pb-10">
        <span className="text-[#C9A84C] text-[10px] md:text-xs tracking-[0.3em] font-sans font-extrabold uppercase">
          ABOUT THE JOURNAL
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-[#F5F5F0] font-normal tracking-tight">
          Aesthetic Authority
        </h1>
        <p className="font-serif italic text-[#C9A84C] text-lg max-w-2xl mx-auto leading-relaxed mt-2">
          "For the demanding viewer who sees film not as transient background consumption, but as a crucial visual rhythm of intellectual beauty."
        </p>
      </div>

      {/* Brand Story (2 Columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch leading-relaxed text-[#E2E2D5] text-sm md:text-base font-body">
        <div className="space-y-4">
          <h2 className="text-[#C9A84C] text-[11px] font-sans font-bold uppercase tracking-widest">
            OUR GENESIS & ETHOS
          </h2>
          <p>
            Founded in the autumn of 2022 by a collective of disgruntled critics and independent film scholars, 
            <strong> The Film Journal</strong> was conceived as a defensive bulwark against the ongoing trivialization of cinema coverage. As traditional newspapers shuttered their specialized arts desks and digital media succumbed to clickbait lists governed by algorithms, we saw a critical void that needed urgent, uncompromising action.
          </p>
          <p>
            We operate under a strict baseline of editorial independence. We do not write for studios, nor do we optimize our headlines to feed viral aggregators. Every review, essay, and box office breakdown is penned with academic precision, stylistic layout grace, and aesthetic integrity.
          </p>
        </div>

        <div className="bg-[#111111]/80 border border-[#2E2E2E] p-6 rounded-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif text-[#C9A84C] text-lg font-normal">
              Our Core Convictions
            </h3>
            <ul className="space-y-3.5 text-xs text-gray-400 font-sans">
              <li className="flex gap-3">
                <Shield size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span><strong>Auteur Defense:</strong> Championing directors who push physical limitations of spatial framing and Kodak formatting.</span>
              </li>
              <li className="flex gap-3">
                <Award size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span><strong>Intellectual Rigor:</strong> Writing comprehensive film critiques that inspect screenplays, music orchestration, and color psychology.</span>
              </li>
              <li className="flex gap-3">
                <Film size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span><strong>Theatrical Sincerity:</strong> Supporting physical cinemas and the communal magic of dark projection rooms over digital isolation.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2E2E2E]/60 pt-4 flex justify-between items-center text-[10px] uppercase font-mono text-gray-400">
            <span>PRINT ISSN 2992-0021</span>
            <span>Est. New York City</span>
          </div>
        </div>
      </section>

      {/* The Manifesto Highlight */}
      <section className="bg-black border border-[#2E2E2E] p-8 md:p-10 relative overflow-hidden rounded-sm text-center">
        {/* Absolute watermark background monogram */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-3 select-none text-9xl font-serif text-[#C9A84C] pointer-events-none">
          TFJ
        </div>

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <span className="text-[#C9A84C] text-[10px] tracking-widest font-mono uppercase block">The Editorial Manifesto</span>
          <p className="font-serif italic text-md md:text-lg text-gray-200 leading-relaxed">
            "We believe cinema is sculpting with light, shadow, and silence. Editorial coverage must mirror that gravity—written with deep respect for the artists, the medium, and the scholars who analyze it."
          </p>
          <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mt-4" />
        </div>
      </section>

      {/* MASTHEAD DIRECTORY Section */}
      <section id="editorial-masthead" className="space-y-8">
        <div className="border-b border-[#2E2E2E] pb-3 text-center md:text-left">
          <h2 className="font-serif text-xl tracking-wide text-white">
            The Journal Masthead <span className="text-[#C9A84C] italic font-medium text-xs">&bull; Year 2026 Directory</span>
          </h2>
        </div>

        <div className="space-y-10">
          {masthead.map((section) => (
            <div key={section.role} className="space-y-6">
              <h3 className="text-xs uppercase font-sans tracking-widest text-[#C9A84C] font-semibold border-b border-[#2E2E2E]/40 pb-1 w-full md:w-max">
                {section.role}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.members.map((member) => (
                  <div 
                    key={member.name}
                    className="p-5 bg-[#111111] border border-[#2E2E2E] rounded-xs space-y-2 group hover:border-[#C9A84C]/30 duration-200 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-sm font-bold text-[#F5F5F0]">
                        {member.name}
                      </h4>
                      <span className="text-[10px] text-[#C9A84C] font-mono uppercase tracking-wider text-right">
                        {member.title.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-[#C9A84C] font-sans font-semibold">
                      {member.title}
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed pt-1.5">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
