"use client";
import { motion } from 'framer-motion';
import { 
  Play, 
  Code, 
  Shield, 
  Zap, 
  Globe, 
  Building,
  GitBranch,
  Cpu,
  Lock,
  Activity,
  Clock
} from 'lucide-react';
import { tutorials, Tutorial } from '../data/tutorials';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';

// Icon mapping for tutorials
const iconMap: { [key: string]: React.ReactNode } = {
  Globe: <Globe className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Play: <Play className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Building: <Building className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
};

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': 
      return { 
        bg: 'rgba(34, 197, 94, 0.1)', 
        text: '#22C55E', 
        border: 'rgba(34, 197, 94, 0.3)' 
      };
    case 'Intermediate': 
      return { 
        bg: 'rgba(251, 191, 36, 0.1)', 
        text: '#FBBF24', 
        border: 'rgba(251, 191, 36, 0.3)' 
      };
    case 'Advanced': 
      return { 
        bg: 'rgba(239, 68, 68, 0.1)', 
        text: '#EF4444', 
        border: 'rgba(239, 68, 68, 0.3)' 
      };
    default: 
      return { 
        bg: 'rgba(0,113,247,0.05)', 
        text: colors.primary.DEFAULT, 
        border: 'rgba(0,113,247,0.14)' 
      };
  }
};

export default function TutorialsList() {
  const categories = Array.from(new Set(tutorials.map((t: Tutorial) => t.category)));
  
  return (
    <>
      {categories.map((category: string, categoryIndex: number) => {
        const categoryTutorials = tutorials.filter((t: Tutorial) => t.category === category);
        
        return (
          <motion.section
            key={category}
            initial={motionTokens.section.initial}
            whileInView={motionTokens.section.whileInView}
            transition={{
              ...motionTokens.section.transition,
              delay: categoryIndex * 0.1
            }}
            viewport={{ once: true }}
            style={{ marginBottom: spacing[16] }}
          >
            {/* Category Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: spacing[8]
            }}>
              <div>
                <h2 style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontSize: '24px',
                  fontWeight: typography.fontWeight.bold,
                  color: 'rgba(0,46,101,0.9)',
                  marginBottom: spacing[2],
                  margin: 0
                }}>
                  {category}
                </h2>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: typography.fontWeight.regular,
                  color: 'rgba(0,46,101,0.6)',
                  margin: 0
                }}>
                  {categoryTutorials.length} tutorials available
                </p>
              </div>
              <div style={{
                height: '1px',
                flex: 1,
                background: 'linear-gradient(to right, rgba(0,46,101,0.2), transparent)',
                marginLeft: spacing[8]
              }} />
            </div>

            {/* Tutorials Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: spacing[6]
            }}>
              {categoryTutorials.map((tutorial: Tutorial, index: number) => {
                const difficultyStyle = getDifficultyStyle(tutorial.difficulty || '');
                
                return (
                  <motion.div
                    key={tutorial.id}
                    initial={motionTokens.card.initial}
                    whileInView={motionTokens.card.whileInView}
                    transition={{
                      ...motionTokens.card.transition,
                      delay: index * 0.05
                    }}
                    viewport={{ once: true }}
                    style={{
                      backgroundColor: '#F7FAFE',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Preview Image Placeholder */}
                    <div style={{
                      backgroundColor: '#EAF3FD',
                      height: '138px',
                      borderRadius: '5px',
                      margin: spacing[6],
                      marginBottom: spacing[2.5],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {/* Icon overlay */}
                      <div style={{
                        position: 'absolute',
                        top: spacing[3],
                        left: spacing[3],
                        background: `linear-gradient(135deg, ${colors.primary.DEFAULT}, #4F46E5)`,
                        borderRadius: '8px',
                        padding: spacing[2],
                        color: 'white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      }}>
                        {iconMap['Code'] || <Code className="w-5 h-5" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: `0 ${spacing[6]} ${spacing[2.5]} ${spacing[6]}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: spacing[3],
                      flex: 1
                    }}>
                      {/* Title and Difficulty */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: spacing[3]
                      }}>
                        <h3 style={{
                          fontFamily: 'Inter Tight, sans-serif',
                          fontSize: '15px',
                          fontWeight: typography.fontWeight.bold,
                          lineHeight: 1.08,
                          color: 'rgba(0,46,101,0.9)',
                          margin: 0,
                          flex: 1
                        }}>
                          {tutorial.title}
                        </h3>
                        <div style={{
                          backgroundColor: difficultyStyle.bg,
                          color: difficultyStyle.text,
                          border: `1px solid ${difficultyStyle.border}`,
                          borderRadius: '3px',
                          padding: `${spacing[1]} ${spacing[2]}`,
                          fontSize: '10px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: typography.fontWeight.medium,
                          lineHeight: '12px',
                          whiteSpace: 'nowrap'
                        }}>
                          {tutorial.difficulty || 'Tutorial'}
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontFamily: 'SF Mono, monospace',
                        fontSize: '12px',
                        fontWeight: typography.fontWeight.regular,
                        lineHeight: 1.5,
                        color: 'rgba(0,46,101,0.8)',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {tutorial.description}
                      </p>

                      {/* Duration */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing[3],
                        marginTop: 'auto'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <Clock style={{ width: '12px', height: '12px', color: '#002e65' }} />
                          <span style={{
                            fontSize: '10px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: typography.fontWeight.medium,
                            color: '#002e65',
                            lineHeight: '12px'
                          }}>
                            {tutorial.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{
                      padding: spacing[6],
                      display: 'flex',
                      gap: spacing[3]
                    }}>
                      <a
                        href={`/examples/tutorial/${tutorial.id}`}
                        style={{
                          flex: 1,
                          backgroundColor: colors.primary.DEFAULT,
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '3px',
                          padding: `${spacing[2]} ${spacing[4]}`,
                          fontSize: '10px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: typography.fontWeight.bold,
                          cursor: 'pointer',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: spacing[1],
                          lineHeight: '12px'
                        }}
                      >
                        <Play style={{ width: '12px', height: '12px' }} />
                        <span>Start Tutorial</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        );
      })}
    </>
  );
}