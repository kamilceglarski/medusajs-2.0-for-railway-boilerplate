"use client"

import React, { useState, useEffect } from 'react'

interface InPostPoint {
  name: string
  address: {
    line1: string
    line2?: string
  }
  location: {
    latitude: number
    longitude: number
  }
}

interface InPostSelectorProps {
  onSelect: (point: InPostPoint) => void
  selectedPoint?: InPostPoint | null
  autoOpen?: boolean
}

// Rozszerz window object dla TypeScript
declare global {
  interface Window {
    easyPack?: any
    easyPackAsyncInit?: () => void
  }
}

const InPostSelector: React.FC<InPostSelectorProps> = ({ onSelect, selectedPoint, autoOpen }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Dołącz arkusz stylów geowidget, jeśli nie istnieje
    if (!document.getElementById('inpost-geowidget-style')) {
      const link = document.createElement('link')
      link.id = 'inpost-geowidget-style'
      link.rel = 'stylesheet'
      link.href = 'https://geowidget.easypack24.net/css/easypack.css'
      document.head.appendChild(link)
    }

    // Sprawdź czy skrypt już istnieje
    if (document.getElementById('inpost-geowidget-script')) {
      setIsLoaded(true)
      return
    }

    // Załaduj skrypt InPost Geowidget
    const script = document.createElement('script')
    script.id = 'inpost-geowidget-script'
    script.src = 'https://geowidget.easypack24.net/js/sdk-for-javascript.js'
    script.async = true
    script.onload = () => {
      console.log('InPost Geowidget loaded')
      setIsLoaded(true)
      try {
        // If openInPostMap already prepared an async init callback, call it now
        if (window.easyPack && typeof window.easyPackAsyncInit === 'function') {
          try {
            window.easyPackAsyncInit()
          } catch (e) {
            console.warn('easyPackAsyncInit threw on script.onload', e)
          }
        }
      } catch (e) {
        console.warn('Error calling easyPackAsyncInit after script load', e)
      }
    }
    script.onerror = () => {
      console.error('Failed to load InPost Geowidget')
    }
    document.body.appendChild(script)

    return () => {
      // Nie usuwaj skryptu przy unmount - może być używany przez inne komponenty
    }
  }, [])

  const openInPostMap = () => {
    // Jeśli skrypt jeszcze się nie załadował, nie rób nic
    // Zawsze definiujemy init. Jeśli easyPack jest dostępny – odpalamy od razu.
    // Jeśli nie jest, uruchamiamy krótki polling, aby poczekać na definicję globalnej zmiennej.
    window.easyPackAsyncInit = function () {
      try {
        // Initialize the library once, but always attach a new widget to the container
        if (!(window as any).__easyPackLibraryInitialized) {
          window.easyPack.init({
            instance: 'pl',
            defaultLocale: 'pl',
            mapType: 'osm',
            searchType: 'osm',
            points: { types: ['parcel_locker'] },
            map: { initialTypes: ['parcel_locker'] },
          })
          ;(window as any).__easyPackLibraryInitialized = true
        }

        // Ensure container exists and is clean before attaching widget
        const container = document.getElementById('easypack-map')
        if (!container) {
          console.warn('easypack-map container not found')
          return
        }
        // Remove leftover children from previous initializations
        try {
          while (container.firstChild) container.removeChild(container.firstChild)
        } catch (e) {
          console.warn('Failed to clear easypack-map container', e)
        }

        // Always (re)attach the map widget to the container so remounts / re-opens work
        if (window.easyPack && typeof window.easyPack.mapWidget === 'function') {
          window.easyPack.mapWidget('easypack-map', function(point: any) {
          // Callback gdy użytkownik wybierze paczkomat
            onSelect({
            name: point.name,
            address: {
              line1: point.address.line1,
              line2: point.address.line2,
            },
            location: {
              latitude: point.location.latitude,
              longitude: point.location.longitude,
            },
          })
            // Po wyborze spróbuj zamknąć popup widgetu, jeśli to możliwe
            try {
              // Jeśli widget udostępnia metodę zamknięcia
              if (window.easyPack && typeof window.easyPack.closePopup === 'function') {
                window.easyPack.closePopup()
                return
              }

              // Kliknij przyciski zamykające w popularnych implementacjach (Leaflet, easypack)
              const closeBtns = Array.from(document.querySelectorAll('.leaflet-popup-close-button, .easypack-popup__close, .easypack-popup__close-btn, button[aria-label="Close"]')) as HTMLElement[]
              if (closeBtns.length) {
                closeBtns.forEach(btn => btn.click())
                return
              }

              // Usuń widoczne popupy należące do widgetu (ostrożnie)
              const possiblePopups = Array.from(document.querySelectorAll('[class*=\"easypack\"], .leaflet-popup')) as HTMLElement[]
              for (const p of possiblePopups) {
                // tylko jeśli popup zawiera przycisk z tekstem 'Wybierz' lub 'Szczegóły'
                if (p.innerText && /Wybierz|Szczegóły|Szczegoly/i.test(p.innerText)) {
                  p.remove()
                }
              }
            } catch (e) {
              // Nie blokujemy działania na błędach czyszczących DOM
              console.warn('Failed to close InPost popup automatically', e)
            }
        })
        } else {
          console.warn('easyPack.mapWidget is not available')
        }
      } catch (e) {
        console.error('Failed to init InPost widget:', e)
      }
    }

    const tryInit = () => {
      if ((window as any).easyPack) {
        try {
          if (typeof (window as any).easyPackAsyncInit === 'function') {
            ;(window as any).easyPackAsyncInit()
          }
        } catch (e) {
          console.warn('easyPack init failed on tryInit', e)
        }
        return true
      }
      return false
    }

    if (!tryInit()) {
      let attempts = 0
      const max = 60
      const interval = setInterval(() => {
        attempts++
        if (tryInit() || attempts >= max) {
          clearInterval(interval)
          if (attempts >= max) console.warn('easyPack not available after waiting')
        }
      }, 300)
    }
  }

  // Auto-open when requested and script is loaded
  useEffect(() => {
    if (autoOpen && isLoaded) {
      openInPostMap()
    }
  }, [autoOpen, isLoaded])

  return (
    <div className="inpost-selector">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={openInPostMap}
          disabled={!isLoaded}
          type="button"
          className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoaded ? 'Wybierz Paczkomat InPost' : 'Ładowanie mapy...'}
        </button>

        {selectedPoint && (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-sm">
            <span className="font-semibold">{selectedPoint.name}</span>
            <span className="ml-2 text-gray-600">
              {selectedPoint.address.line1}
              {selectedPoint.address.line2 && `, ${selectedPoint.address.line2}`}
            </span>
          </div>
        )}
      </div>

      {/* Kontener na mapę - ograniczona szerokość, stała wysokość */}
      <div className="mt-4 w-full max-w-2xl mx-auto">
        <div id="easypack-map" className="w-full h-80 rounded-lg border border-gray-200 overflow-hidden"></div>
      </div>
    </div>
  )
}

export default InPostSelector