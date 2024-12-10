"use client";

import { useState, useEffect } from 'react';
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map<string, THREE.Texture>();

export function useTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTexture = async () => {
      if (!url) return;

      try {
        // Check cache first
        if (textureCache.has(url)) {
          const cached = textureCache.get(url)!;
          if (isMounted) {
            setTexture(cached);
            setIsLoading(false);
          }
          return;
        }

        // Load new texture
        const newTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            url,
            (loadedTexture) => {
              loadedTexture.wrapS = THREE.RepeatWrapping;
              loadedTexture.wrapT = THREE.RepeatWrapping;
              loadedTexture.repeat.set(4, 4);
              loadedTexture.needsUpdate = true;
              textureCache.set(url, loadedTexture);
              resolve(loadedTexture);
            },
            undefined,
            reject
          );
        });

        if (isMounted) {
          setTexture(newTexture);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load texture'));
          setTexture(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    loadTexture();

    return () => {
      isMounted = false;
    };
  }, [url]);

  // Cleanup texture when component unmounts
  useEffect(() => {
    return () => {
      if (!document.querySelector(`[data-texture="${url}"]`)) {
        const tex = textureCache.get(url);
        if (tex) {
          tex.dispose();
          textureCache.delete(url);
        }
      }
    };
  }, [url]);

  return { texture, isLoading, error };
}