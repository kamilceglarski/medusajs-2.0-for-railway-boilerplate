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
}

// Rozszerz window object dla TypeScript
declare global {
  interface Window {
    easyPack?: any
    easyPackAsyncInit?: () => void
  }
}

const InPostSelector: React.FC<InPostSelectorProps> = ({ onSelect, selectedPoint }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
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
    if (!window.easyPack) {
      console.error('InPost widget not loaded')
      return
    }

    window.easyPackAsyncInit = function () {
      window.easyPack.init({
        instance: 'pl',
        defaultLocale: 'pl',
        mapType: 'osm',
        searchType: 'osm',
        points: {
          types: ['parcel_locker']
        },
        map: {
          initialTypes: ['parcel_locker']
        }
      })

      const map = window.easyPack.mapWidget('easypack-map', function(point: any) {
        // Callback gdy użytkownik wybierze paczkomat
        console.log('Selected InPost point:', point)
        onSelect({
          name: point.name,
          address: {
            line1: point.address.line1,
            line2: point.address.line2
          },
          location: {
            latitude: point.location.latitude,
            longitude: point.location.longitude
          }
        })
      })
    }

    if (window.easyPack) {
      window.easyPackAsyncInit()
    }
  }

  return (
    <div className="inpost-selector">
      <button
        onClick={openInPostMap}
        disabled={!isLoaded}
        type="button"
        className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {isLoaded ? 'Wybierz Paczkomat InPost' : 'Ładowanie...'}
      </button>

      {selectedPoint && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2 text-sm">Wybrany paczkomat:</h3>
          <p className="text-sm font-medium">{selectedPoint.name}</p>
          <p className="text-xs text-gray-600 mt-1">
            {selectedPoint.address.line1}
            {selectedPoint.address.line2 && `, ${selectedPoint.address.line2}`}
          </p>
        </div>
      )}

      {/* Kontener na mapę - musi być w DOM */}
      <div id="easypack-map"></div>
    </div>
  )
}

export default InPostSelector