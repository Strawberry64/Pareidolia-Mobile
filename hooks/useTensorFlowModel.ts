/*
 * Author: Armando Vega
 * Date Created: 9 Feb 2026
 * 
 * Last Modified By: Armando Vega
 * Date Last Modified: 9 Feb 2026
 * 
 * Description: Custom hook to load a TensorFlow Lite model using react-native-fast-tflite.
 */

import { useEffect, useState } from 'react'
import { loadTensorflowModel } from 'react-native-fast-tflite';

export function useTensorflowModel(modelPath: any) {
  const [model, setModel] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    let loadedModel: any = null

    const load = async () => {
      try {
        setLoading(true)
        loadedModel = await loadTensorflowModel(modelPath)
        
        if (mounted) {
          setModel(loadedModel)
          setLoading(false)
        } else {
          loadedModel?.release?.()
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error)
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
      loadedModel?.release?.()
    }
  }, [modelPath])

  return { model, loading, error }
}