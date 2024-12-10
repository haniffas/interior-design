"use client";

import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map<string, THREE.Texture>();

export function useTextureManager(source: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const loadTexture = useCallback(async (url: string) => {
    if (textureCache.has(url)) {
      return textureCache.get(url)!;
    }

    return new Promise<THREE.Texture>((resolve, reject) => {
      textureLoader.load(
        url,
        (loadedTexture) => {
          loadedTexture.wrapS = THREE.RepeatWrapping;
          loadedTexture.wrapT = THREE.RepeatWrapping;
          loadedTexture.repeat.set(2, 2);
          loadedTexture.needsUpdate = true;
          textureCache.set(url, loadedTexture);
          resolve(loadedTexture);
        },
        undefined,
        (error) => reject(new Error(`Failed to load texture: ${error.message}`))
      );
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const handleTextureLoad = async () => {
      if (!source || source.startsWith('#')) {
        setTexture(null);
        setError(null);
        return;
      }

      try {
        const loadedTexture = await loadTexture(source);
        if (isMounted) {
          setTexture(loadedTexture);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Texture loading error:', err);
          setError(err instanceof Error ? err : new Error('Failed to load texture'));
          setTexture(null);
        }
      }
    };

    handleTextureLoad();

    return () => {
      isMounted = false;
      if (source.startsWith('blob:')) {
        URL.revokeObjectURL(source);
      }
    };
  }, [source, loadTexture]);

  return { texture, error };
}