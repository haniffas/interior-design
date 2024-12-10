"use client";

import { useState, useEffect } from 'react';
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map<string, THREE.Texture>();

export function useTextureLoader(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTexture = async () => {
      if (!url) {
        if (isMounted) {
          setTexture(null);
          setError(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        // Check cache first
        if (textureCache.has(url)) {
          const cached = textureCache.get(url)!;
          if (isMounted) {
            setTexture(cached);
            setIsLoading(false);
            setError(null);
          }
          return;
        }

        // Load new texture
        const newTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          const onLoad = (loadedTexture: THREE.Texture) => {
            loadedTexture.wrapS = THREE.RepeatWrapping;
            loadedTexture.wrapT = THREE.RepeatWrapping;
            loadedTexture.repeat.set(2, 2);
            loadedTexture.needsUpdate = true;
            textureCache.set(url, loadedTexture);
            resolve(loadedTexture);
          };

          const onError = () => reject(new Error(`Failed to load texture: ${url}`));

          // For blob URLs, ensure cross-origin is set
          if (url.startsWith('blob:')) {
            textureLoader.setCrossOrigin('');
          }

          textureLoader.load(url, onLoad, undefined, onError);
        });

        if (isMounted) {
          setTexture(newTexture);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading texture:', err);
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
      // Clean up blob URLs when component unmounts
      if (url.startsWith('blob:') && !textureCache.has(url)) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  return { texture, isLoading, error };
}