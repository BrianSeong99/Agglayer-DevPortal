'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe, 
  BookOpen, 
  Code, 
  ArrowRight, 
  Telescope, 
  GraduationCap, 
  Wrench,
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const NavigationGuidance = () => {
  const navigationCards = [
    {
      title: "Explore Chains",
      description: "Visual discovery of 20+ connected chains in the Agglayer ecosystem",
      href: "/aggniverse",
      icon: <Telescope className="w-8 h-8" />,
      color: "from-[#0071F7] to-[#0071F7]/80",
      bgColor: "bg-[#0071F7]/10",
      borderColor: "border-[#0071F7]/30",
      features: [
        "3D solar system interface",
        "Real-time network status",
        "Chain-specific developer resources",
        "Live cross-chain activity"
      ],
      audience: "Perfect for understanding the ecosystem and finding the right chains for your project."
    },
    {
      title: "Learn & Examples",
      description: "Production-ready templates, tutorials, and code examples",
      href: "/examples",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-[#0071F7] to-[#0071F7]/80",
      bgColor: "bg-[#0071F7]/10",
      borderColor: "border-[#0071F7]/30",
      features: [
        "Production templates",
        "Step-by-step tutorials",
        "Code snippets library",
        "Real implementations"
      ],
      audience: "Ideal for developers learning cross-chain development or looking for ready-to-use templates."
    },
    {
      title: "Developer Tools",
      description: "Essential tools for building, testing, and deploying cross-chain dApps",
      href: "/tools",
      icon: <Wrench className="w-8 h-8" />,
      color: "from-[#0071F7] to-[#0071F7]/80",
      bgColor: "bg-[#0071F7]/10",
      borderColor: "border-[#0071F7]/30",
      features: [
        "lxly.js SDK",
        "AggSandbox local dev",
        "Bridge interface",
        "Testnet faucet"
      ],
      audience: "Everything you need to build, test, and deploy cross-chain applications."
    }
  ];

  const quickActions = [
    {
      title: "5-Minute Setup",
      description: "Get AggSandbox running locally",
      action: "Start Building",
      href: "/developers",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      title: "Explore Live Chains",
      description: "See all 20+ connected networks",
      action: "Open AggNiverse",
      href: "/aggniverse",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Learn Fundamentals",
      description: "Understand Agglayer architecture",
      action: "View Examples",
      href: "/examples",
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-transparent to-[#000000]/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Where would you want to GO
          </h2>
          <p className="text-xl text-[#D9D9D9] max-w-3xl mx-auto">
            Choose your path based on what you want to accomplish. Each section is designed 
            for different needs and experience levels.
          </p>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {navigationCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`group relative h-full ${card.bgColor} border ${card.borderColor} backdrop-blur-sm hover:border-opacity-60 transition-all duration-300`}>
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${card.color} text-white mb-4 w-fit`}>
                    {card.icon}
                  </div>
                  <CardTitle className="text-2xl text-white">{card.title}</CardTitle>
                  <CardDescription className="text-[#D9D9D9] text-lg leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#D9D9D9]/80 uppercase tracking-wide mb-3">Features</h4>
                    <ul className="space-y-2">
                      {card.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-[#D9D9D9]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D9D9D9]/50" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audience */}
                  <p className="text-[#D9D9D9]/80 text-sm italic">{card.audience}</p>
                </CardContent>
                
                <CardFooter>
                  <Button asChild className="group/btn">
                    <Link 
                      href={card.href}
                      className="inline-flex items-center gap-2"
                    >
                      {card.title === "Explore Chains" && "Explore"}
                      {card.title === "Learn & Examples" && "Learn"}
                      {card.title === "Developer Tools" && "Explore Tools"}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#000000]/30 rounded-2xl p-8 border border-[#D9D9D9]/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Quick Actions</h3>
            <p className="text-[#D9D9D9]">Jump straight to what you need</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[#000000]/50 border border-[#D9D9D9]/30 hover:border-[#D9D9D9]/50 hover:bg-[#000000]/70 transition-all duration-300"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-[#000000]/70 group-hover:bg-[#000000]/60 transition-colors">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white group-hover:text-[#0071F7] transition-colors">
                    {action.title}
                  </div>
                  <div className="text-sm text-[#D9D9D9]/80 group-hover:text-[#D9D9D9] transition-colors">
                    {action.description}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D9D9D9]/80 group-hover:text-[#0071F7] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-[#D9D9D9]/80 text-sm">
            <Code className="w-4 h-4" />
            <span>Ready to dive deeper?</span>
          </div>
          <p className="text-[#D9D9D9] mt-2">
            All paths lead to building amazing cross-chain applications on Agglayer.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NavigationGuidance;