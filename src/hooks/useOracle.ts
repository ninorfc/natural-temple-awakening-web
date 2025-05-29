
import { useState } from 'react';
import { OracleState, OracleReading } from '@/types/oracle';
import { OracleAI } from '@/services/oracleAI';

export const useOracle = () => {
  const [state, setState] = useState<OracleState>({
    isGenerating: false,
    currentReading: null,
    history: []
  });

  const generateLunarReading = async () => {
    setState(prev => ({ ...prev, isGenerating: true }));
    
    try {
      const reading = await OracleAI.generateLunarReading();
      setState(prev => ({
        isGenerating: false,
        currentReading: reading,
        history: [reading, ...prev.history]
      }));
      return reading;
    } catch (error) {
      setState(prev => ({ ...prev, isGenerating: false }));
      throw error;
    }
  };

  const generateCardsReading = async () => {
    setState(prev => ({ ...prev, isGenerating: true }));
    
    try {
      const reading = await OracleAI.generateCardsReading();
      setState(prev => ({
        isGenerating: false,
        currentReading: reading,
        history: [reading, ...prev.history]
      }));
      return reading;
    } catch (error) {
      setState(prev => ({ ...prev, isGenerating: false }));
      throw error;
    }
  };

  const generateIntuitiveReading = async () => {
    setState(prev => ({ ...prev, isGenerating: true }));
    
    try {
      const reading = await OracleAI.generateIntuitiveReading();
      setState(prev => ({
        isGenerating: false,
        currentReading: reading,
        history: [reading, ...prev.history]
      }));
      return reading;
    } catch (error) {
      setState(prev => ({ ...prev, isGenerating: false }));
      throw error;
    }
  };

  const clearCurrentReading = () => {
    setState(prev => ({ ...prev, currentReading: null }));
  };

  return {
    ...state,
    generateLunarReading,
    generateCardsReading,
    generateIntuitiveReading,
    clearCurrentReading
  };
};
